import { USER_END_POINT } from "./endpoints.ts"
import { apiGetAuth } from "../baseApi"


export const getUser = (id) => {
    var url = `${USER_END_POINT.GET_USER}/${id}`
    return apiGetAuth(url)
}