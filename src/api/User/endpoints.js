import { API_ENDPOINT } from "../ApiRootEndpoint";

export const USER_END_POINT = {
    GET_USER: `${API_ENDPOINT.USER}`, // id
    UPDATE_USER_INFO: `${API_ENDPOINT.USER}/info`, //id
    UPDATE_USER_PASSWORD: `${API_ENDPOINT.USER}/password`, //id
    GET_USER_PUBLIC_INFO: `${API_ENDPOINT.USER}/info`, //id
    MAKE_USER_FRIEND_RELATIONSHIP: `${API_ENDPOINT.USER}/makefriend`
}