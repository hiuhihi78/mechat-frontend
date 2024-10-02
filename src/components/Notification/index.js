import { Avatar, Space } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "~/contexts/RealTime/Connection";
import { NotificationContext as NotificationContextUI } from "~/contexts/UI/NotificationContext"

function Notification() {

    const navigate = useNavigate()
    const notification = useContext(NotificationContext)
    const notifiacionUI = useContext(NotificationContextUI)

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
            Notification
        </>
    );
}

export default Notification;