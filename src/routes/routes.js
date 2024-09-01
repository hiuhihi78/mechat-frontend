import { ENPOINT } from "~/constants/Enpoint.constant.ts";
import { ROLE } from "~/constants/Role.constant.ts";

import EmptyLayout from "~/layouts/ChatLayout";
import MainLayout from "~/layouts/MainLayout";
import SettingLayout from "~/layouts/SettingLayout";
import ConfirmSignUp from "~/pages/ConfirmSignUp";
import Home from "~/pages/Home";
import Profile from "~/pages/Setting/Profile";
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
    {
        path: ENPOINT.CONFIRM_SIGN_UP,
        component: <ConfirmSignUp />,
        layout: <EmptyLayout />
    },
    {
        path: ENPOINT.SETTING,
        component: <SettingLayout><Profile /></SettingLayout>,
        layout: <MainLayout />,
        roles: [ROLE.USER]
    },
    {
        path: ENPOINT.SETTING_PROFILE,
        component: <Profile />,
        layout: <MainLayout><SettingLayout /></MainLayout>,
        roles: [ROLE.USER]
    },
    {
        path: ENPOINT.SETTING_CHANGE_PASSWORD,
        component: <Profile />,
        layout: <MainLayout><SettingLayout /></MainLayout>,
        roles: [ROLE.USER]
    },
    // {
    //     path: ENPOINT.ADMIN,
    //     component: <Admin />,
    //     layout: <MainLayout />,
    //     roles: [ROLE.ADMIN]
    // }
]

export default routes;