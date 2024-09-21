const { notification } = require("antd");
const { createContext } = require("react");

export const NotificationContext = createContext();

function Notification({ children }) {

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type = 'success', message = 'Thông báo', description = '', placement = 'bottomRight', onClick = () => { }, duration = 5, className = '', style = {}) => {
        if (type === 'open') {
            api.open({
                placement: placement,
                message: message,
                description: description,
                onClick: onClick,
                className: className,
                duration: duration,
                style: style,
            });
            return;
        }
        api[type]({
            type: type,
            placement: placement,
            message: message,
            description: description,
            onClick: onClick(),
            className: className,
            duration: duration,
            style: style,
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