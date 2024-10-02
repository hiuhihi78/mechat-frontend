import { useAuthUser } from 'react-auth-kit';
import NotificationItem from '~/components/NotificationItem';

const notification = {
    id: 1,
    userId: '12133',
    createDate: '2024-10-01 13:26:00.0000000',
    content: 'Lê Đức Hiếu đã gửi cho bạn yêu cầu kết bạn.',
    image: 'https://me-chat.s3.ap-southeast-1.amazonaws.com/962ec689-39ca-41c7-6398-08dce2f49e41_2024102807271622.jpg',
    isReaded: false
}

function Home() {
    const auth = useAuthUser()
    const user = auth()

    return (
        <>
            <div>
                Hello - {user?.fullname}
            </div>

            <NotificationItem notification={notification} />
        </>
    )
}

export default Home;