import { useAuthUser } from 'react-auth-kit';

export function Home() {
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