import { useSignOut } from 'react-auth-kit';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import { ENPOINT } from '~/constants/Enpoint.constant';
import { removeAllDataInCookie } from "~/utils/cookie.util"

function SignOut() {
    const signOut = useSignOut()

    const clickSignOutButton = () => {
        removeAllDataInCookie()
        signOut();
    }

    return (
        <>
            <Link to={ENPOINT.HOME} onClick={clickSignOutButton}>
                <div className='text-red-500'>
                    <FontAwesomeIcon icon={faRightFromBracket} className='mr-2' />
                    <b>Logout</b>
                </div>
            </Link>
        </>
    );
}

export default SignOut;