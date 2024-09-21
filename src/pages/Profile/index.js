import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useLayoutEffect, useState } from "react";

import styles from "./Profile.module.scss"
import HeaderProfile from "~/components/Profile/HeaderProfile";
import { getUserPublicInfo } from "~/api/User";
import { LoadingContext } from "~/contexts/UI/LoadingContext";
import { RESULT_CODES } from "~/constants/ResultCode.constant.ts";
import { useAuthUser } from "react-auth-kit";
import { FRIEND_STATUS } from "~/constants/FriendStatus.constant.ts";
import { ENPOINT } from "~/constants/Enpoint.constant.ts";


function Profile() {

    let { id } = useParams()

    const auth = useAuthUser()
    const user = auth()
    const navigate = useNavigate();
    const loading = useContext(LoadingContext)

    const [friendInfo, setfriendInfo] = useState({
        friends: []
    })

    useLayoutEffect(() => {
        loading(true)
        getUserPublicInfo(id, user?.userId)
            .then((response) => {
                var data = response.value
                if (data.relationshipStatus === FRIEND_STATUS.BLOCK ||
                    data.relationshipStatus === RESULT_CODES.NOT_FOUND
                ) {
                    navigate(ENPOINT.NOT_FOUND)
                    return;
                }
                setfriendInfo({
                    ...friendInfo,
                    userId: data.id,
                    email: data.email,
                    avatar: data.avatar,
                    coverPhoto: data.coverPhoto,
                    fullname: data.fullname,
                    username: data.username,
                    relationshipStatus: data.relationshipStatus,
                    totalFriends: data.totalFriends,
                    friends: data.friends
                })
            })
            .catch(() => {

            })
            .finally(() => {
                loading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={clsx(styles['container'])}>
            <HeaderProfile friendInfo={friendInfo} />
        </div>
    );
}

export default Profile;