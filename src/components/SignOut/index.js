import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { Button } from 'antd';
import { ENPOINT } from '~/constants/Enpoint.constant.ts';

function SignOut() {
    const signOut = useSignOut()
    const navigate = useNavigate();

    const clickSignOutButton = () => {
        signOut();
        navigate(ENPOINT.SIGN_IN)
    }

    return (
        <>
            <Button type="text" className='pl-5 pr-5' onClick={clickSignOutButton}>Log out</Button>
        </>
    );
}

export default SignOut;