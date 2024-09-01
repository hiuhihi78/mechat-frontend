import { API_ENDPOINT } from "../ApiRootEndpoint.ts";

export const AUTH_END_POINT = {
    SIGN_IN: `${API_ENDPOINT.AUTH}/signIn`,
    SIG_IN_BY_GOOGLE: `${API_ENDPOINT.AUTH}/SignInByGoogle`,
    SIGN_UP: `${API_ENDPOINT.AUTH}/signUp`,
    CONFIRM_SIGN_UP: `${API_ENDPOINT.AUTH}/confirmSignUp`,
    REFESH_TOKEN: `${API_ENDPOINT.AUTH}/refreshToken`,
    USER_INFO: `${API_ENDPOINT.AUTH}/User`
}