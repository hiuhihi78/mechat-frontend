import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { getUser } from "~/api/User";
import { LoadingContext } from "~/contexts/LoadingContext";


function Profile() {

    const auth = useAuthUser()
    const user = auth()
    const loading = useContext(LoadingContext)

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        loading(true)
        var id = user.userId
        getUser(id).then((response) => {

        }).catch((err) => {

        }).finally(() => {
            loading(false)
        })
    }, [])


    return (
        <>

        </>
    );
}

export default Profile;