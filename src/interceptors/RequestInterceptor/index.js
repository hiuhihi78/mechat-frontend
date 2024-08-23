import axios from 'axios'

export const RequestInterceptor = ({ children }) => {
    axios.interceptors.request.use(function (config) {

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    return (
        <>{children}</>
    )
}

