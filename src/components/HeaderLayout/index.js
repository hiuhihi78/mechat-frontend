import { clsx } from 'clsx';
import { useAuthUser } from 'react-auth-kit';
import { Button, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightToBracket,
    faUserPlus,
    faUser,
    faGear
}
    from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

import styles from "./HeaderLayout.module.scss"
import { useNavigate } from 'react-router-dom';
import { ENPOINT } from '~/constants/Enpoint.constant.ts';
import SignOut from '../SignOut';


const items = [
    // {
    //     key: '1',
    //     label: (
    //         <Link to={ENPOINT.SETTING_PROFILE}>
    //             <FontAwesomeIcon icon={faUser} className='mr-2' />
    //             <span>Profile</span>
    //         </Link>
    //     ),
    // },
    {
        key: '1',
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


function HeaderLayout() {

    const auth = useAuthUser();
    const user = auth();

    const navigate = useNavigate();

    return (
        <div className={clsx(styles.header)}>
            <div className={clsx(styles.logo)}>
                <Avatar
                    shape="square" size={'large'}
                    onClick={() => { navigate(ENPOINT.HOME) }}
                    src='https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/444151048_3675983452660958_468097532445298241_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=wRPBeAZt0UEQ7kNvgEgAU2M&_nc_ht=scontent.fhan2-4.fna&oh=00_AYBjwXQnz2NTeURVP2ecf4tdItSijXOPhT0BR_LjMpgntA&oe=66D9C53E'
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
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="bottom"
                                    arrow
                                    styles={{ minWidth: '40px' }}
                                >
                                    <Space>
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