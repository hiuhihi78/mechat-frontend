import { apiGetAuth, apiPost } from "../baseApi"
import { AUTH_END_POINT } from "./endpoints.ts"

export const signIn = (data) => {
    const url = AUTH_END_POINT.SIGN_IN
    return apiPost(url, data)
}

export const refreshToken = () => {

}

export const getUserInfo = (id) => {
    const url = `${AUTH_END_POINT.USER_INFO}/${id}`
    return apiGetAuth(url)
}