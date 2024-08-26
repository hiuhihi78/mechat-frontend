import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { Button } from 'antd';
import { ENPOINT } from '~/constants/Enpoint.constant.ts';
import { removeAllDataInCookie } from "~/utils/cookie.util"

function SignOut() {
    const signOut = useSignOut()
    const navigate = useNavigate();

    const clickSignOutButton = () => {
        signOut();
        removeAllDataInCookie()
        navigate(ENPOINT.SIGN_IN)
    }

    return (
        <>
            <Button type="text" className='pl-5 pr-5' onClick={clickSignOutButton}>Log out</Button>
        </>
    );
}

export default SignOut;