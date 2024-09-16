import { useContext, useEffect, useLayoutEffect, useRef, useState, useCallback, useMemo } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import {
    faUserPlus,
    faUserCheck,
    faUserXmark,
    faUserLargeSlash,
    faUserLock,
    faUserMinus,
    faLockOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Menu, Space, Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

import { makeUserFriendRelationship } from "~/api/User";
import { NotificationContext } from "~/contexts/NotificationContext";
import { ENPOINT } from "~/constants/Enpoint.constant.ts";
import { FRIEND_STATUS } from "~/constants/FriendStatus.constant.ts";
import { RESULT_CODES } from "~/constants/ResultCode.constant.ts";

const { confirm } = Modal;

function HeaderProfileFriendButtons({ friendInfo }) {

    const auth = useAuthUser()
    const user = auth()
    const notification = useContext(NotificationContext)
    const navigate = useNavigate()

    const friendInfoRef = useRef(friendInfo);
    const [friendStatus, setFriendStatus] = useState(FRIEND_STATUS.UN_FRIEND)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [buttonUnFriendLoading, setButtonUnFriendLoading] = useState(false)

    const timeoutButtonLoadingRef = useRef(null)
    const timeoutButtonFriendStatusRef = useRef(null)
    const timeoutButtonUnFriendStatusRef = useRef(null)

    const itemsDropDownFrienndAcceptedStatus = useMemo(() => [
        {
            key: '1',
            label: (
                <Space><FontAwesomeIcon icon={faUserMinus} /> Hủy kết bạn</Space>
            ),
            onClick: () => { modalConfrimUnFriend() }
        },
        {
            key: '2',
            label: (
                <Space className="text-red-500"><FontAwesomeIcon icon={faUserLock} /> Chặn</Space>
            ),
            onClick: () => { modalConfrimBlock() }
        },
    ], []);

    useLayoutEffect(() => {
        setFriendStatus(friendInfo.relationshipStatus)
    }, [friendInfo])

    useLayoutEffect(() => {
        friendInfoRef.current = friendInfo;
    }, [friendInfo]);


    const handleMakeUserFriendRelationship = useCallback(
        (status) => {
            const currentFriendInfo = friendInfoRef.current;

            if (user?.userId === undefined) {
                navigate(ENPOINT.SIGN_IN);
                return;
            }

            if (status === FRIEND_STATUS.UN_FRIEND) {
                setButtonUnFriendLoading(true);
            } else {
                setButtonLoading(true);
            }

            makeUserFriendRelationship(user.userId, currentFriendInfo.userId, status)
                .then((response) => {
                    if (response.code !== RESULT_CODES.SUCCESS) {
                        notification('info', null, 'Đã xảy ra lỗi! Vui lòng tải lại trang!');
                        return;
                    }

                    if (status === FRIEND_STATUS.UN_FRIEND) {
                        timeoutButtonUnFriendStatusRef.current = setTimeout(() => {
                            setButtonUnFriendLoading(false);
                        }, 1000);
                    } else {
                        timeoutButtonLoadingRef.current = setTimeout(() => {
                            setButtonLoading(false);
                        }, 1000);
                    }

                    timeoutButtonFriendStatusRef.current = setTimeout(() => {
                        setFriendStatus(response.value.newRelationshipStatus);
                    }, 1200);
                })
                .catch(() => {
                    // Handle error
                })
                .finally(() => {
                    // Final clean up
                });
        },
        []
    );


    useEffect(() => {
        return () => {
            clearTimeout(timeoutButtonLoadingRef.current)
            clearTimeout(timeoutButtonFriendStatusRef.current)
            clearTimeout(timeoutButtonUnFriendStatusRef)
        }
    }, [])

    const modalConfrimBlock = () => {
        confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn có chắc chắn chặn người dùng này không?',
            okText: 'Đồng ý',
            onOk() {
                handleMakeUserFriendRelationship(FRIEND_STATUS.BLOCK)
            },
            okCancel: 'Hủy',
            loading: buttonLoading,
        });
    }

    const modalConfrimUnFriend = () => {
        confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn có chắc chắn hủy kết bạn người dùng này không?',
            okText: 'Đồng ý',
            onOk() {
                handleMakeUserFriendRelationship(FRIEND_STATUS.UN_FRIEND)
            },
            okCancel: 'Hủy',
            loading: buttonLoading,
        });
    }

    const modalConfrimUnBlock = () => {
        confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn có chắc chắn bỏ chặn người dùng này không?',
            okText: 'Đồng ý',
            onOk() {
                handleMakeUserFriendRelationship(FRIEND_STATUS.REQUSET_UN_BLOCK)
            },
            okCancel: 'Hủy',
            loading: buttonLoading,
        });
    }

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
                        <>
                            <Dropdown
                                placement="bottomRight"
                                arrow
                                overlay={<Menu items={itemsDropDownFrienndAcceptedStatus} />}
                            >
                                <Button type="default">
                                    <FontAwesomeIcon icon={faUserCheck} />
                                    Bạn bè
                                </Button>
                            </Dropdown>
                        </>
                    )
                } else if (friendStatus === FRIEND_STATUS.BLOCK_REQUESTER) {
                    return (
                        <Button type="default" danger
                            onClick={() => modalConfrimUnBlock()}
                        >
                            <FontAwesomeIcon icon={faLockOpen} />
                            Bỏ chặn
                        </Button>
                    )
                }
            })()}
        </>
    );
}

export default HeaderProfileFriendButtons;