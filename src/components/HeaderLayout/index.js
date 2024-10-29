import { clsx } from 'clsx';
import { useAuthUser } from 'react-auth-kit';
import { Button, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightToBracket,
    faUserPlus,
    faGear,
    faUser
}
    from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

import styles from "./HeaderLayout.module.scss"
import { useNavigate } from 'react-router-dom';
import { ENPOINT } from '~/constants/Enpoint.constant';
import SignOut from '../SignOut';
import Notification from '../Notification';





function HeaderLayout() {

    const auth = useAuthUser();
    const user = auth();

    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: (
                <Link to={ENPOINT.PROFILE.replace(':id', user?.userId)}>
                    <FontAwesomeIcon icon={faUser} className='mr-2' />
                    <span>Profile</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={ENPOINT.SETTING_PROFILE}>
                    <FontAwesomeIcon icon={faGear} className='mr-2' />
                    <span>Setting</span>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <SignOut />
            ),
        },
    ];

    return (
        <div className={clsx(styles.header)}>
            <div className={clsx(styles.logo)}>
                <Avatar
                    shape="square" size={'large'}
                    onClick={() => { navigate(ENPOINT.HOME) }}
                    src='https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/457752325_1702887640469218_3857779335270403849_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=4bAfZh-8d7MQ7kNvgFjec7e&_nc_ht=scontent.fhan2-4.fna&oh=00_AYB_KFXirMVamQnFFaigIllV-BkgR7KJunLS4gCY5ldWUw&oe=66E19E7D'
                />
            </div>
            <div className={clsx(styles.menu)}>
                {(() => {
                    if (user === undefined || user === null) {
                        return (
                            <div className={clsx(styles['menu-user-un-sign-in'])}>
                                <Button type="primary" size="middle" icon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    onClick={() => { navigate(ENPOINT.SIGN_IN) }}
                                >
                                    Sign In
                                </Button>
                                <Button type="primary" className='bg-cyan-500 hover:bg-cyan-600' size="middle" icon={<FontAwesomeIcon icon={faUserPlus} />}
                                    onClick={() => { navigate(ENPOINT.SIGN_UP) }}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )
                    } else {
                        return (

                            <div className={clsx(styles['menu-user-sign-in'])}>
                                <Notification />
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottom"
                                    arrow
                                    styles={{ minWidth: '40px' }}
                                >
                                    <Space style={{ width: "150px" }}>
                                        {user.avatar === '' ?
                                            <Avatar size="default" icon={<UserOutlined />} />
                                            :
                                            <Avatar size="default" src={user.avatar} />
                                        }

                                        <p>{user?.fullname}</p>
                                    </Space>
                                </Dropdown>
                            </div>
                        )
                    }
                })()}
            </div>
        </div>
    );
}

export default HeaderLayout;