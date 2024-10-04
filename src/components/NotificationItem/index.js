import clsx from "clsx";
import styles from "./NotificationItem.module.scss"
import { Avatar } from "antd";
import moment from 'moment';
import 'moment/locale/vi';

function NotificationItem({ notification }) {

    return (
        <div className={clsx(styles['container'])}>
            <div className={clsx(styles['image'])}>
                <Avatar src={notification.image} size="large" />
            </div>
            <div className={clsx(styles['info'])}>
                <div className={clsx(styles['content'])}>
                    <p>{notification.content}</p>
                </div>
                <div className={clsx(styles['time'])}>
                    <p className={notification.isReaded ? clsx(styles["time_Read"]) : ''}>
                        {moment(notification.createDate).fromNow()}
                    </p>
                </div>
            </div>
            <div className={clsx(styles['isReaded'])}>
                {!notification.isReaded ?
                    <span className={clsx(styles['circle'])}></span>
                    :
                    <></>
                }
            </div>
        </div>
    );
}

export default NotificationItem;