
import axios from 'axios'
import { useContext } from 'react';
import { NotificationContext } from '~/contexts/NotificationContext';

export const ResponseInterceptor = ({ children }) => {

    const notification = useContext(NotificationContext)

    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        notification('error', null, 'Server error! Please comeback in tomorrow')
        return error.response;
    });

    return (
        <>{children}</>
    )
}

