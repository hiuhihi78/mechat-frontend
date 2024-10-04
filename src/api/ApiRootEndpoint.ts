
export const API :string = `${process.env.REACT_APP_API_END_POINT}/api/${process.env.REACT_APP_API_VERSION}`

export const API_ENDPOINT = {
    AUTH : `${API}/auth`,
    USER : `${API}/user`,
    NOTIFICATION: `${API}/notification`
}