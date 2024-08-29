import { ENPOINT } from "~/constants/Enpoint.constant.ts";

import EmptyLayout from "~/layouts/ChatLayout";
import MainLayout from "~/layouts/MainLayout";
import { Home } from "~/pages/Home";
import { SignIn } from "~/pages/SignIn";
import { SignUp } from "~/pages/SignUp";


const routes = [
    {
        path: ENPOINT.EMPTY,
        component: <Home />,
        layout: <MainLayout />,
    },
    {
        path: ENPOINT.HOME,
        component: <Home />,
        layout: <MainLayout />,
    },
    {
        path: ENPOINT.SIGN_IN,
        component: <SignIn />,
        layout: <EmptyLayout />
    },
    {
        path: ENPOINT.SIGN_UP,
        component: <SignUp />,
        layout: <EmptyLayout />
    },
    // {
    //     path: ENPOINT.ADMIN,
    //     component: <Admin />,
    //     layout: <MainLayout />,
    //     roles: [ROLE.ADMIN]
    // }
]

export default routes;