import { clsx } from 'clsx';
import { useAuthUser } from 'react-auth-kit';
import { Button, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import styles from "./HeaderLayout.module.scss"
import { useNavigate } from 'react-router-dom';
import { ENPOINT } from '~/constants/Enpoint.constant.ts';
import SignOut from '../SignOut';


const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
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
                    src='https://cdnphoto.dantri.com.vn/YAfcu9nd4T5dX06hhpaf19_QvY8=/thumb_w/960/2021/05/15/co-gai-noi-nhu-con-vi-anh-can-cuoc-xinh-nhu-mong-nhan-sac-ngoai-doi-con-bat-ngo-hon-2-1621075314070.jpg'
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
                                        <Avatar size="default" icon={<UserOutlined />} />
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