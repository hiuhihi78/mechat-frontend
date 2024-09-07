
import axios from 'axios'
import { useContext } from 'react';

import { HTTP_STATUS_CODE } from '~/constants/HttpStatusCode.constant.ts';
import { NotificationContext } from '~/contexts/NotificationContext';
import { removeAllDataInCookie } from '~/utils/cookie.util';

export const ResponseInterceptor = ({ children }) => {

    const notification = useContext(NotificationContext)

    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response.status === HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY) {
            return response.data;
        }
        return response.data;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (error.response.status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
            notification('error', 'Notification', 'Server error! Please comeback in tomorrow')
        } else if (error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
            notification('info', "Notification", 'Your session has been expried!')
            removeAllDataInCookie();
            window.location.reload()
            return error;
        } else if (error.response.status === HTTP_STATUS_CODE.NOT_FOUND) {
            notification('error', 'Notification', 'Server error! Please comeback in tomorrow')
            return error;
        } else if (error.response.status === HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY) {
            return error.response.data;
        }
        return error.response;
    });

    return (
        <>{children}</>
    )
}

