import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import {
    faUserPlus,
    faUserCheck,
    faUserXmark,
    faUserLargeSlash
} from '@fortawesome/free-solid-svg-icons'
import { Button, Space } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { makeUserFriendRelationship } from "~/api/User";
import { NotificationContext } from "~/contexts/NotificationContext";
import { ENPOINT } from "~/constants/Enpoint.constant.ts";
import { FRIEND_STATUS } from "~/constants/FriendStatus.constant.ts";
import { RESULT_CODES } from "~/constants/ResultCode.constant.ts";

function HeaderProfileFriendButtons({ friendInfo }) {

    const auth = useAuthUser()
    const user = auth()
    const notification = useContext(NotificationContext)
    const navigate = useNavigate()

    const [friendStatus, setFriendStatus] = useState(FRIEND_STATUS.UN_FRIEND)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [buttonUnFriendLoading, setButtonUnFriendLoading] = useState(false)

    const timeoutButtonLoadingRef = useRef(null)
    const timeoutButtonFriendStatusRef = useRef(null)
    const timeoutButtonUnFriendStatusRef = useRef(null)

    useLayoutEffect(() => {
        setFriendStatus(friendInfo.relationshipStatus)
    }, [friendInfo])

    const handleMakeUserFriendRelationship = (status) => {
        if (user?.userId === undefined) {
            navigate(ENPOINT.SIGN_IN)
            return;
        }

        if (status === FRIEND_STATUS.UN_FRIEND) {
            setButtonUnFriendLoading(true)
        } else {
            setButtonLoading(true)
        }

        makeUserFriendRelationship(user.userId, friendInfo.userId, status)
            .then((response) => {
                if (response.code !== RESULT_CODES.SUCCESS) {
                    notification('info', null, 'Đã xảy ra lỗi! Vui lòng tải lại trang!')
                    return;
                }

                if (status === FRIEND_STATUS.UN_FRIEND) {
                    timeoutButtonUnFriendStatusRef.current = setTimeout(() => {
                        setButtonLoading(false)
                    }, 1000)
                } else {
                    timeoutButtonLoadingRef.current = setTimeout(() => {
                        setButtonLoading(false)
                    }, 1000)
                }



                timeoutButtonFriendStatusRef.current = setTimeout(() => {
                    setFriendStatus(status)
                }, 1200)
            })
            .catch(() => {

            })
            .finally(() => {

            })
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeoutButtonLoadingRef.current)
            clearTimeout(timeoutButtonFriendStatusRef.current)
        }
    }, [])

    return (
        <>
            {(() => {
                if (friendStatus === FRIEND_STATUS.UN_FRIEND) {
                    return (
                        <>
                            <Button type="primary"
                                onClick={() => handleMakeUserFriendRelationship(FRIEND_STATUS.WATTING_ACCEPT)}
                                loading={buttonLoading}
                            >
                                <FontAwesomeIcon icon={faUserPlus} />
                                Thêm bạn bè
                            </Button>
                        </>
                    )
                } else if (friendStatus === FRIEND_STATUS.WATTING_ACCEPT) {
                    return (
                        <>
                            <Button type="default"
                                onClick={() => handleMakeUserFriendRelationship(FRIEND_STATUS.UN_FRIEND)}
                                loading={buttonUnFriendLoading}
                            >
                                <FontAwesomeIcon icon={faUserXmark} />
                                Huỷ yêu cầu kết bạn
                            </Button>
                        </>
                    )
                } else if (friendStatus === FRIEND_STATUS.FRIEND_REQUEST) {
                    return (
                        <Space>
                            <Button type="primary"
                                onClick={() => handleMakeUserFriendRelationship(FRIEND_STATUS.ACCEPTED)}
                                loading={buttonLoading}
                            >
                                <FontAwesomeIcon icon={faUserCheck} />
                                Chấp nhận lời mời
                            </Button>
                            <Button type="default"
                                onClick={() => handleMakeUserFriendRelationship(FRIEND_STATUS.UN_FRIEND)}
                                loading={buttonUnFriendLoading}
                            >
                                <FontAwesomeIcon icon={faUserLargeSlash} />
                                Xóa lời mời
                            </Button>
                        </Space>
                    )
                } else if (friendStatus === FRIEND_STATUS.ACCEPTED) {
                    return (
                        <Button type="default">
                            <FontAwesomeIcon icon={faUserCheck} />
                            Bạn bè
                        </Button>
                    )
                }
            })()}
        </>
    );
}

export default HeaderProfileFriendButtons;