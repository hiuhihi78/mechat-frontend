export enum ENPOINT {
    //#region Common
    EMPTY = '',
    HOME = '/home',
    SIGN_IN = '/signIn',
    SIGN_UP = '/signUp',
    CONFIRM_SIGN_UP = '/confirmSignUp',
    NOT_FOUND = '/notfound',
    ADMIN = '/admin',
    PROFILE = '/profile/:id',
    //#endregion

    //#region User setting
    SETTING = "/setting",
    SETTING_PROFILE = `${ENPOINT.SETTING}/profile`,
    SETTING_CHANGE_PASSWORD = `${ENPOINT.SETTING}/changePassword`
    //#endregion
}