import Notification from "~/contexts/NotificationContext"

const ContextContainer = ({ children }) => {

    return (
        <>
            <Notification>
                {children}
            </Notification>
        </>
    )
}

export default ContextContainer