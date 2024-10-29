import { NOTIFICATION_TYPE_CONTENT } from "~/constants/Notification.constant"

export const GetNotificationContent = (type) => {
    const entry = Object.entries(NOTIFICATION_TYPE_CONTENT).find(([key, value]) => value.ID === type);
    return entry[1].CONTENT;
}


export const GetNotificationLink = (type, id) => {
    const entry = Object.entries(NOTIFICATION_TYPE_CONTENT).find(([key, value]) => value.ID === type);
    return `${entry[1].LINK}${id}`;
}