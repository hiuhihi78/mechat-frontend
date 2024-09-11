import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useContext, useLayoutEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import styles from "./Profile.module.scss"
import HeaderProfile from "./HeaderProfile";
import { getUserPublicInfo } from "~/api/User";
import { LoadingContext } from "~/contexts/LoadingContext";
import { NotificationContext } from "~/contexts/NotificationContext";
import { RESULT_CODES } from "~/constants/ResultCode.constant.ts";


function Profile() {

    let { id } = useParams()

    const auth = useAuthUser()
    const user = auth()
    const loading = useContext(LoadingContext)
    const notification = useContext(NotificationContext)

    const [userInfo, setUserInfo] = useState({})

    useLayoutEffect(() => {
        loading(true)
        getUserPublicInfo(id)
            .then((response) => {
                if (response.code !== RESULT_CODES.SUCCESS) {
                    notification('error', 'Hệ thống đang gặp lỗi!')
                    return;
                }
                var data = response.value
                setUserInfo({
                    ...userInfo,
                    userId: data.id,
                    email: data.email,
                    avatar: data.avatar,
                    fullname: data.fullName,
                    username: data.username,
                    isViewMyProfile: id === user?.userId
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
            <HeaderProfile user={userInfo} />
        </div>
    );
}

export default Profile;