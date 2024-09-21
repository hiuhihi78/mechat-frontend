
export const ROOT = `${process.env.REACT_APP_API_END_POINT}/realtime`

export const REAL_TIME_METHOD = {
    NOTIFICATION: 'notification'
}

export const REAL_TIME_ENDPOINT = {
    USER: `${ROOT}/${REAL_TIME_METHOD.NOTIFICATION}`
}

