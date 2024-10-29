import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Space, Button, Badge, Empty } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell
} from '@fortawesome/free-solid-svg-icons'
import clsx from "clsx";

import { NotificationContext } from "~/contexts/RealTime/Connection";
import { NotificationContext as NotificationContextUI } from "~/contexts/UI/NotificationContext"
import NotificationItem from "../NotificationItem";
import styles from "./Notification.module.scss"
import { getNotifications, readNotification, readAllNotification } from "~/api/Notification";
import { GetNotificationContent, GetNotificationLink } from './Notification.service'


function Notification() {

    const navigate = useNavigate()
    const notification = useContext(NotificationContext)
    const notifiacionUI = useContext(NotificationContextUI)

    const [items, setItems] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    const [numberUnReadNotification, setNumberUnReadNotification] = useState(0)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [pageIndex, setPageIndex] = useState(1)

    useLayoutEffect(() => {
        // get first 5 notifications

        getNotifications()
            .then((response) => {
                setItems(response.value.items)
                setHasNextPage(response.value.hasNextPage)
            })

        setNumberUnReadNotification(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (notification === undefined || notification === '')
            return;

        //open modal notification
        notifiacionUI(
            'open',
            '',
            <Space>
                <Avatar src={notification.Image} />
                <b>{notification.RequesterName}</b>
                <span> {GetNotificationContent(notification.Type)}</span>
            </Space>,
            'bottomLeft',
            () => { navigate(`${GetNotificationLink(notification.Type)}${notification.Link}`) })

        console.log(notification)

        //add new notification into list
        setItems((prev) =>
            [
                {
                    id: notification.Id,
                    type: notification.Type,
                    requesterName: notification.RequesterName,
                    createdDate: notification.CreatedDate,
                    image: notification.Image,
                    isReaded: notification.IsReaded,
                    link: notification.Link,
                },
                ...prev
            ])

        setNumberUnReadNotification(numberUnReadNotification + 1)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notification])

    const handleClickNotification = () => {
        setShowNotification(!showNotification)
        setNumberUnReadNotification(0)
    }

    const handleReadNotification = (id, isReaded) => {
        //close popup notification
        setShowNotification(false)

        if (isReaded)
            return;

        //make readed in UI
        var readNotificationIndex = items.findIndex(x => x.id === id)
        var notificationRead = items.find(x => x.id === id)
        var makeReaded = {
            ...notificationRead,
            isReaded: true
        }
        items.splice(readNotificationIndex, 1, makeReaded)
        setItems([...items])

        //make readed in db
        readNotification(id)
    }

    const getMoreNotifications = () => {
        var newPageIndex = pageIndex + 1
        setPageIndex(newPageIndex)
        getNotifications(newPageIndex)
            .then((response) => {
                setItems((prev) => [
                    ...prev,
                    ...response.value.items
                ])
                setHasNextPage(response.value.hasNextPage)
            })
    }

    const handleReadAllNotification = () => {
        //UI
        let readAllNotifications = items.map(item => ({
            ...item,
            isReaded: true
        }));
        setItems(readAllNotifications)

        //make readed in db
        readAllNotification()

    }

    return (
        <div className={clsx(styles['notification'])}>

            <div className={clsx(styles["notification-icon"], showNotification && styles["notification-icon_selected"])}
                onClick={handleClickNotification}
            >
                <Badge count={numberUnReadNotification}>
                    <FontAwesomeIcon icon={faBell} className={clsx(styles["bell-icon"])} />
                </Badge>
            </div>

            {showNotification ?
                <div className={clsx(styles["container"])}>
                    <div className={clsx(styles["header"])}>
                        <span className={clsx(styles["header-title"])}>Thông báo</span>
                        <Button
                            type="link"
                            className={clsx(styles["header-btn-read-all"])}
                            onClick={() => handleReadAllNotification()}
                        >
                            Đánh dấu tất cả đã đọc
                        </Button>
                    </div>
                    <hr className={clsx(styles["divider"])} />
                    <div className={clsx(styles["body"])}>
                        {items.map((item) => {
                            return (
                                <div onClick={() => handleReadNotification(item.id, item.isReaded)}>
                                    <NotificationItem
                                        key={item.id}
                                        notification={item}
                                    />
                                </div>
                            )
                        })}

                        {(items.length === 0) &&
                            <Empty />
                        }
                    </div>
                    <div className={clsx(styles["footer"])}>
                        <Button
                            type="link"
                            hidden={!hasNextPage}
                            onClick={() => getMoreNotifications()}
                        >
                            Xem thêm
                        </Button>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default Notification;