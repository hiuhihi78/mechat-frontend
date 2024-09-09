import axios from "axios"
import { getAccessToken } from "~/utils/cookie.util";

axios.defaults.headers.common['Content-Type'] = 'application/json';

// const headerRequestForForm = () => {
//     return {
//         headers: {
//             Authorization: `Bearer ${''}`,
//             'Content-Type': "multipart/form-data",
//         },
//     };
// };

export const apiGet = async (url, option = {}) => {
    const response = axios.get(url, option)
    return response
}

export const apiGetAuth = async (url, option) => {
    option = {
        ...option,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    }
    const response = apiGet(url, option)
    return response
}

export const apiPut = async (url, data, option = {}) => {
    const response = axios.put(url, data, option)
    return response
}

export const apiPutAuth = async (url, data, option = {}) => {
    option = {
        ...option,
        headers: {
            ...option.headers,
            Authorization: `Bearer ${getAccessToken()}`,
        },
    }
    const response = apiPut(url, data, option)
    return response
}

export const apiPutAuthForm = async (url, data, option = {}) => {
    option = {
        ...option,
        headers: {
            'Content-Type': "multipart/form-data",
        },
    }
    const response = apiPutAuth(url, data, option)
    return response
}

export const apiPost = async (url, data, option = {}) => {
    const response = axios.post(url, data, option)
    return response
}

export const apiPostAuth = async (url, data, option = {}) => {
    option = {
        ...option,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    }
    const response = apiPost(url, data, option)
    return response
}

export const apiDelete = async (url, data, option = {}) => {
    const response = axios.delete(url, data, option)
    return response
}

export const apiDeleteAuth = async (url, data, option = {}) => {
    option = {
        ...option,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    }
    const response = apiDelete(url, data, option)
    return response
}