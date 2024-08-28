import { useCallback, useState, useLayoutEffect, useEffect, useContext } from "react";
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import routes from "../routes";
import NotFound from "~/pages/NotFound";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { getAccessToken, getUserId } from "~/utils/cookie.util";
import { getUserInfo } from "~/api/Auth";
import { RESULT_CODES } from "~/constants/ResultCode.constant.ts";
import { LoadingContext } from "~/contexts/LoadingContext";
import { APPLICATION } from "~/constants/Appication.constant.ts";
import { ENPOINT } from "~/constants/Enpoint.constant.ts";

function Routing() {

    const loading = useContext(LoadingContext)
    const signInAuth = useSignIn();
    const auth = useAuthUser()
    const user = auth()

    const [routesCanVisit, setRoutesCanVisit] = useState([])

    const getRoutesCanVisit = useCallback(() => {
        setRoutesCanVisit([])
        routes.forEach((route) => {
            if (route.role === undefined) {
                setRoutesCanVisit((prev) => [...prev, route])
            } else {
                if (user.roleId === undefined)
                    return;
                if (route.roles.includes(user.roleId)) {
                    setRoutesCanVisit((prev) => [...prev, route])
                }
            }
        })
    }, [user]);

    useEffect(() => {
        loading(true)
        if (user !== null) {
            loading(false, 1000)
            return;
        }

        var userId = getUserId()
        var accessToken = getAccessToken()
        if (userId === null || userId === undefined ||
            accessToken === null || accessToken === undefined) {
            loading(false, 1000)
            return;
        }

        getUserInfo(userId).then((response) => {
            if (response.code !== RESULT_CODES.SUCCESS)
                return;

            signInAuth({
                token: '',
                expiresIn: 10000,
                //refresh: result.value.refreshToken,
                authState: {
                    userId: response.value.userId,
                    fullname: response.value.fullname,
                    roleId: response.value.roleId
                }
            })
        }).finally(() => {
            loading(false, 1000)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useLayoutEffect(() => {
        getRoutesCanVisit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    window.cookieStore.addEventListener("change", (event) => {
        var currentUrl = window.location.href
        if (currentUrl.includes(ENPOINT.SIGN_IN))
            return;

        event.deleted.forEach((cookie) => {
            if (cookie.name === APPLICATION.ACCESS_TOKEN ||
                cookie.name === APPLICATION.USER_ID
            ) {
                window.location.reload();
            }
        });
    });

    return (
        <>
            <Router>
                <Routes>
                    {routesCanVisit.map((route, index) => {
                        return (
                            <Route key={index} path={route.path} element={route.layout ? route.layout : <Outlet />}>
                                <Route key={route.path} path="" element={route.component} />
                            </Route>
                        )
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default Routing;