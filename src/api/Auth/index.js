import { apiGetAuth, apiPost } from "../baseApi"
import { AUTH_END_POINT } from "./endpoints.ts"
import { getUserId, getAccessToken } from "~/utils/cookie.util"

export const signIn = (data) => {
    const url = AUTH_END_POINT.SIGN_IN
    return apiPost(url, data)
}

export const signInByGoogle = (data) => {
    const url = AUTH_END_POINT.SIG_IN_BY_GOOGLE
    return apiPost(url, data)
}

export const refreshToken = (data) => {
    const url = AUTH_END_POINT.REFESH_TOKEN
    const userId = getUserId()
    const accessToken = getAccessToken()
    const option = {
        headers: {
            x_mechat_u_id: `${userId}`,
            Authorization: `Bearer ${accessToken}`,
        }
    }
    return apiPost(url, data, option)
}

export const getUserInfo = (id) => {
    const url = `${AUTH_END_POINT.USER_INFO}/${id}`
    return apiGetAuth(url)
}