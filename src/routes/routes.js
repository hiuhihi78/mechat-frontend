import { ENPOINT } from "~/constants/Enpoint.constant.ts";
import { ROLE } from "~/constants/Role.constant";

import EmptyLayout from "~/layouts/ChatLayout";
import MainLayout from "~/layouts/MainLayout";
import SettingLayout from "~/layouts/SettingLayout";
import ConfirmSignUp from "~/pages/ConfirmSignUp";
import Home from "~/pages/Home";
import ChangePassword from "~/pages/Setting/ChangePassword";
import { Profile as SettingProfile } from "~/pages/Setting/Profile";
import Profile from "~/pages/Profile";
import { SignIn } from "~/pages/SignIn";
import { SignUp } from "~/pages/SignUp";


const routes = [
    //#endregion Common
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
        path: ENPOINT.CONFIRM_SIGN_UP,
        component: <ConfirmSignUp />,
        layout: <EmptyLayout />
    },
    {
        path: ENPOINT.PROFILE,
        component: <Profile />,
        layout: <MainLayout />
    },
    //#endregion

    //#region User setting
    {
        path: ENPOINT.SETTING,
        component: <SettingLayout><SettingProfile /></SettingLayout>,
        layout: <MainLayout />,
        roles: [ROLE.USER]
    },
    {
        path: ENPOINT.SETTING_PROFILE,
        component: <SettingLayout><SettingProfile /></SettingLayout>,
        layout: <MainLayout />,
        roles: [ROLE.USER]
    },
    {
        path: ENPOINT.SETTING_CHANGE_PASSWORD,
        component: <SettingLayout><ChangePassword /></SettingLayout>,
        layout: <MainLayout />,
        roles: [ROLE.USER]
    },
    //#endregion
]

export default routes;