import clsx from "clsx";
import styles from "./FriendItem.module.scss"

function FriendItem() {
    return (
        <div className={clsx(styles['container'])}>
            <div className={clsx(styles['avatar'])}>
                {/* <img src="https://top10tphcm.com/wp-content/uploads/2023/02/gai-dep-nhat-viet-nam-17.jpg" alt="avatar" /> */}
            </div>
            <div className={clsx(styles['content'])}>
                <div className={clsx(styles['name'])}>

                </div>
                <div className={clsx(styles['friendNumbers'])}>

                </div>
            </div>
        </div>
    );
}

export default FriendItem;