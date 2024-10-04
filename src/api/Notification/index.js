import { NOTIFICATION_END_POINT } from "./endpoints"
import { apiGetAuth } from "../baseApi"


export const getNotifications = (pageIndex = 1) => {
    var url = `${NOTIFICATION_END_POINT.GET_NOTIFICATION}?pageIndex=${pageIndex}`
    return apiGetAuth(url)
}