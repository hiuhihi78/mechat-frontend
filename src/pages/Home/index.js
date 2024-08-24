import { clsx } from 'clsx';
import styles from "./Home.module.scss"
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { removeAllDataInCookie } from '~/utils/cookie.util'

export function Home() {
    const auth = useAuthUser()
    const user = auth()

    const signOut = useSignOut()
    const navigate = useNavigate();

    const clickSignOutButton = () => {
        signOut();
        removeAllDataInCookie()
        navigate('/signIn')
    }

    return (
        <>
            <p className={clsx(styles.title)}>Home page</p>
            <Button type="primary" onClick={clickSignOutButton}>Log out</Button>

            <div>
                Hello - {user?.userId}
            </div>
        </>
    )
}