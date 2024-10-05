import { NOTIFICATION_END_POINT } from "./endpoints"
import { apiGetAuth, apiPutAuth } from "../baseApi"


export const getNotifications = (pageIndex = 1) => {
    var url = `${NOTIFICATION_END_POINT.GET_NOTIFICATION}?pageIndex=${pageIndex}`
    return apiGetAuth(url)
}

export const readNotification = (id) => {
    var url = `${NOTIFICATION_END_POINT.READ_NOTIFICATION}/${id}`
    return apiPutAuth(url)
}

export const readAllNotification = (id) => {
    var url = `${NOTIFICATION_END_POINT.READ_ALL_NOTIFICATION}`
    return apiPutAuth(url)
}
