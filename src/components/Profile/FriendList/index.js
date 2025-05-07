import clsx from "clsx";
import styles from "./FriendList.module.scss"
import FriendItem from "../FriendItem";

function FriendList() {
    return (
        <>
            <div className={clsx(styles['header'])}>
                <p className="text-2xl font-bold">Bạn bè</p>
            </div>
            <div className={clsx(styles['content'])}>
                <FriendItem />
            </div>
        </>
    );
}

export default FriendList;