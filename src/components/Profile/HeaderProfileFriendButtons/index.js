import { useEffect, useLayoutEffect, useState } from "react";
import { FRIEND_STATUS } from "~/constants/FriendStatus.constant.ts";

import {
    faUserPlus,
    faUserCheck,
    faUserXmark,
    faUserLargeSlash
} from '@fortawesome/free-solid-svg-icons'
import { Button, Space } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HeaderProfileFriendButtons({ user }) {

    const [friendStatus, setFriendStatus] = useState(FRIEND_STATUS.UN_FRIEND)

    useLayoutEffect(() => {
        setFriendStatus(user.relationshipStatus)
    }, [user])

    const handleAddFriend = () => {

    }

    return (
        <>
            {(() => {
                if (friendStatus === FRIEND_STATUS.UN_FRIEND) {
                    return (
                        <>
                            <Button type="primary" onClick={handleAddFriend}>
                                <FontAwesomeIcon icon={faUserPlus} />
                                Thêm bạn bè
                            </Button>
                        </>
                    )
                } else if (friendStatus === FRIEND_STATUS.WATTING_ACCEPT) {
                    return (
                        <>
                            <Button type="default">
                                <FontAwesomeIcon icon={faUserXmark} />
                                Huỷ yêu cầu kết bạn
                            </Button>
                        </>
                    )
                } else if (friendStatus === FRIEND_STATUS.FRIEND_REQUEST) {
                    return (
                        <Space>
                            <Button type="primary">
                                <FontAwesomeIcon icon={faUserCheck} />
                                Chấp nhận lời mời
                            </Button>
                            <Button type="default">
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