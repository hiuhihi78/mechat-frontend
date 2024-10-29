import { ENPOINT } from "./Enpoint.constant";

export const NOTIFICATION_TYPE_CONTENT = {
    FRIEND_REQUEST: {
        ID: 1,
        CONTENT: "đã gửi cho bạn yêu cầu kết bạn",
        LINK: ENPOINT.PROFILE_URL,
    },
    FRIEND_REQUEST_ACCEPTED: {
        ID: 2,
        CONTENT: "đã chấp nhận yêu cầu kết bạn",
        LINK: ENPOINT.PROFILE_URL,
    }
}