import { ENPOINT } from "~/constants/Enpoint.constant.ts";
import { ROLE } from "~/constants/Role.constant.ts";

import EmptyLayout from "~/layouts/ChatLayout";
import MainLayout from "~/layouts/MainLayout";
import Admin from "~/pages/Admin";
import { Home } from "~/pages/Home";
import { SignIn } from "~/pages/SignIn";


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
        path: ENPOINT.ADMIN,
        component: <Admin />,
        layout: <MainLayout />,
        roles: [ROLE.ADMIN]
    }
]

export default routes;