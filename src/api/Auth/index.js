import { apiPost } from "../baseApi"
import { AUTH_END_POINT } from "./endpoints.ts"

export const signIn = (data) => {
    const url = AUTH_END_POINT.SIGN_IN
    return apiPost(url, data)
}