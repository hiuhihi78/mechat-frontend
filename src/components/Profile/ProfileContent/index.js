import clsx from "clsx";
import styles from "./ProfileContent.module.scss"
import { Tabs } from "antd";
import FriendList from "../FriendList";

const items = [
    {
        key: '1',
        label: 'Giới thiệu',
        children: <></>,
    },
    {
        key: '2',
        label: 'Bạn bè',
        children: <FriendList />,
    },
];

function ProfileContent({ friendInfo }) {


    return (
        <div className={clsx(styles['container'])}>
            <div className={clsx(styles['content'])}>
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </div>
    );
}

export default ProfileContent;