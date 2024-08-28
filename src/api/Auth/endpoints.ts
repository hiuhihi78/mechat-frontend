const AUTH_ROOT_ENDPOINT = "auth"

export enum AUTH_END_POINT {
    SIGN_IN = `${AUTH_ROOT_ENDPOINT}/signIn`,
    SIG_IN_BY_GOOGLE = `${AUTH_ROOT_ENDPOINT}/SignInByGoogle`,
    USER_INFO = `${AUTH_ROOT_ENDPOINT}/user`
}