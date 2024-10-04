import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Space, Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell
} from '@fortawesome/free-solid-svg-icons'
import clsx from "clsx";

import { NotificationContext } from "~/contexts/RealTime/Connection";
import { NotificationContext as NotificationContextUI } from "~/contexts/UI/NotificationContext"
import NotificationItem from "../NotificationItem";
import styles from "./Notification.module.scss"


const notifications = [
    {
        id: 1,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
    {
        id: 2,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
    {
        id: 3,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
    {
        id: 4,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
    {
        id: 5,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
    {
        id: 6,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
    {
        id: 7,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
    {
        id: 8,
        userId: '12133',
        createDate: '2024-10-01 13:26:00.0000000',
        content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
        image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
        isReaded: false
    },
]

function Notification() {

    const navigate = useNavigate()
    const notification = useContext(NotificationContext)
    const notifiacionUI = useContext(NotificationContextUI)

    const [items, setItems] = useState([])
    const [showNotification, setShowNotification] = useState(false)

    useLayoutEffect(() => {
        // get first 5 notifications
        setItems(notifications)
    }, [])

    useEffect(() => {
        if (notification === undefined || notification === '')
            return;
        console.log(notification)
        notifiacionUI('open', '', <Space><Avatar src={notification.Image} />{notification.Content}</Space>, 'bottomLeft',
            () => { navigate(notification.Link) }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notification])

    return (
        <>
            <div className={clsx(styles["notification-icon"], showNotification && styles["notification-icon_selected"])}
                onClick={() => setShowNotification(!showNotification)}
            >
                <FontAwesomeIcon icon={faBell} className={clsx(styles["bell-icon"])} />
            </div>

            {showNotification ?
                <div className={clsx(styles["container"])}>
                    <div className={clsx(styles["header"])}>
                        <span className={clsx(styles["header-title"])}>Thông báo</span>
                        <Button type="link" className={clsx(styles["header-btn-read-all"])}>Đánh dấu tất cả đã đọc</Button>
                    </div>
                    <hr className={clsx(styles["divider"])} />
                    <div className={clsx(styles["body"])}>
                        {items.map((item) => {
                            return (
                                <NotificationItem notification={item} />
                            )
                        })}
                    </div>
                    <div className={clsx(styles["footer"])}>
                        <Button type="link">Xem thêm</Button>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
}

export default Notification;