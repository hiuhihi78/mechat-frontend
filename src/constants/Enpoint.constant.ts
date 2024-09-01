export enum ENPOINT {
    EMPTY = '',
    HOME = '/home',
    SIGN_IN = '/signIn',
    SIGN_UP = '/signUp',
    CONFIRM_SIGN_UP = '/confirmSignUp',
    NOT_FOUND = '/notfound',
    ADMIN = '/admin',
    SETTING = "/setting",
    SETTING_PROFILE = `${ENPOINT.SETTING}/profile`,
    SETTING_CHANGE_PASSWORD = `${ENPOINT.SETTING}/changePassword`
}