import { useEffect, useCallback, useState, useLayoutEffect } from "react";
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import routes from "../routes";
import { getUserRoleId } from "~/utils/cookie.util";
import NotFound from "~/pages/NotFound";

function Routing() {

    const [routesCanVisit, setRoutesCanVisit] = useState([])


    const getRoutesCanVisit = useCallback(() => {
        var roleId = getUserRoleId()
        setRoutesCanVisit([])
        routes.forEach((route) => {
            if (route.role === undefined) {
                setRoutesCanVisit((prev) => [...prev, route])
            } else {
                if (roleId === undefined)
                    return;
                if (route.roles.includes(roleId)) {
                    setRoutesCanVisit((prev) => [...prev, route])
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getRoutesCanVisit()
    }, [])

    useLayoutEffect(() => {
        const interval = setInterval(() => {
            getRoutesCanVisit()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

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