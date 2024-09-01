import { useAuthUser } from 'react-auth-kit';

function Home() {
    const auth = useAuthUser()
    const user = auth()

    return (
        <>
            <div>
                Hello - {user?.fullname}
            </div>
        </>
    )
}

export default Home;