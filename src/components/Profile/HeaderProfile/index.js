import clsx from "clsx";
import { useEffect, useState } from "react";
import {
    faPencil,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { Avatar, Space, Tooltip, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "./HeaderProfile.module.scss"
import userCoverImageDefault from '~/assets/user-cover-image-default.png'
import userAvatarDefault from '~/assets/user-avatar-default.png'
import { ENPOINT } from "~/constants/Enpoint.constant.ts";
import { useAuthUser } from "react-auth-kit";
import HeaderProfileFriendButtons from "../HeaderProfileFriendButtons";



function HeaderProfile({ friendInfo, children }) {


    const auth = useAuthUser()
    const currentUser = auth()
    const navigate = useNavigate()

    const [isViewMyProfile, setIsViewMyProfile] = useState(false)
    const [srcCoverPhoto, setSrcCoverPhoto] = useState(userCoverImageDefault)
    const [srcAvatar, setSrcAvatar] = useState(userAvatarDefault)

    useEffect(() => {
        if (currentUser !== null && currentUser.userId === friendInfo.userId) {
            setIsViewMyProfile(true)
        }

        if (friendInfo.coverPhoto !== undefined)
            setSrcCoverPhoto(friendInfo.coverPhoto)

        if (friendInfo.avatar !== undefined) {
            setSrcAvatar(friendInfo.avatar)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friendInfo])

    console.log(srcAvatar)

    return (
        <div className={clsx(styles['container'])}>
            <div className={clsx(styles['content'])}>
                <img className={clsx(styles['cover-photo'])} src={srcCoverPhoto}
                    alt="cover-image"
                />

                <div>
                    <Avatar
                        size={200}
                        src={srcAvatar}
                        className={clsx(styles['avatar'])}
                    />
                    <Space
                        direction="vertical"
                        className={clsx(styles['info'])}
                        size='small'
                    >
                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>
                            {friendInfo?.fullname}
                        </p>
                        <p style={{ color: "gray" }}>205 người bạn</p>
                        <Avatar.Group>
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                            <a href="https://ant.design">
                                <Avatar
                                    style={{
                                        backgroundColor: '#f56a00',
                                    }}
                                >
                                    K
                                </Avatar>
                            </a>
                            <Tooltip title="Ant User" placement="top">
                                <Avatar
                                    src={userAvatarDefault}
                                />
                            </Tooltip>
                            <Avatar
                                src={userAvatarDefault}
                            />
                        </Avatar.Group>
                    </Space>
                    <div
                        className={clsx(styles['container-buttons-user'])}
                    >
                        <Flex justify="flex-end" align="flex-start">
                            {(() => {
                                if (isViewMyProfile) {
                                    return (
                                        <>
                                            <Button type="default"
                                                className={clsx(styles['update-info-button'])}
                                                onClick={() => { navigate(ENPOINT.SETTING_PROFILE) }}
                                            >
                                                <FontAwesomeIcon icon={faPencil} />
                                                Chỉnh sửa thông tin cá nhân
                                            </Button>
                                        </>
                                    )
                                } else {
                                    return (
                                        <HeaderProfileFriendButtons friendInfo={friendInfo} />
                                    )
                                }
                            })()}
                        </Flex>
                    </div
                    >
                </div>
            </div>
        </div>
    );
}

export default HeaderProfile;