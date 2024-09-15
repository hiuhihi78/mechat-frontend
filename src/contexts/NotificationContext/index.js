const { notification } = require("antd");
const { createContext } = require("react");

export const NotificationContext = createContext();

function Notification({ children }) {

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type = 'success', message = 'Thông báo', description = '', placement = 'bottomRight', className = '', style = {}) => {
        api[type]({
            type: type,
            placement: placement,
            message: message,
            description: description,
            className: className,
            style: style
        });
    }

    return (
        <NotificationContext.Provider value={openNotification}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    )

}

export default Notification;