import { USER_END_POINT } from "./endpoints.ts"
import { apiGet, apiGetAuth, apiPostAuth, apiPutAuth, apiPutAuthForm } from "../baseApi"


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

export const getUserPublicInfo = (key, id) => {
    var url = `${USER_END_POINT.GET_USER_PUBLIC_INFO}?key=${key}`
    if (id !== undefined)
        url += `&id=${id}`
    return apiGet(url)
}

export const makeUserFriendRelationship = (userId, friendId, status) => {
    var url = `${USER_END_POINT.MAKE_USER_FRIEND_RELATIONSHIP}`
    var data = { userId, friendId, status }
    return apiPostAuth(url, data)
}