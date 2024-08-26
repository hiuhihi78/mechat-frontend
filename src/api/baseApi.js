import axios from "axios"
import { getAccessToken } from "~/utils/cookie.util";

axios.defaults.baseURL = `${process.env.REACT_APP_API_END_POINT}/api/${process.env.REACT_APP_API_VERSION}/`
axios.defaults.headers.common['Content-Type'] = 'application/json';

const headerRequestAuth = () => {
    return {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    };
};


// const headerRequestForForm = () => {
//     return {
//         headers: {
//             Authorization: `Bearer ${''}`,
//             'Content-Type': "multipart/form-data",
//         },
//     };
// };

export const apiGet = async (url) => {
    const response = axios.get(url)
    return response
}

export const apiGetAuth = async (url) => {
    const response = axios.get(url, headerRequestAuth())
    return response
}

export const apiPut = async (url, data) => {
    const response = axios.put(url, data)
    return response
}

export const apiPutAuth = async (url, data) => {
    const response = axios.put(url, data, headerRequestAuth())
    return response
}

export const apiPost = async (url, data) => {
    const response = axios.post(url, data)
    return response
}


export const apiPostAuth = async (url, data) => {
    const response = axios.post(url, data, headerRequestAuth())
    return response
}

export const apiDelete = async (url, data) => {
    const response = axios.post(url, data)
    return response
}

export const apiDeleteAuth = async (url, data) => {
    const response = axios.post(url, data, headerRequestAuth())
    return response
}