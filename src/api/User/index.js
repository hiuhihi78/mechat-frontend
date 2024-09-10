import { USER_END_POINT } from "./endpoints.ts"
import { apiGetAuth, apiPutAuth, apiPutAuthForm } from "../baseApi"


export const getUser = (id) => {
    var url = `${USER_END_POINT.GET_USER}/${id}`
    return apiGetAuth(url)
}

export const updateUserInfo = (id, data) => {
    var url = `${USER_END_POINT.UPDATE_USER_INFO}/${id}`
    return apiPutAuthForm(url, data)
}

export const updateUserPassword = (id, data) => {
    var url = `${USER_END_POINT.UPDATE_USER_PASSWORD}/${id}`
    return apiPutAuth(url, data)
}