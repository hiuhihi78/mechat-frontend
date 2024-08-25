import Notification from "~/contexts/NotificationContext"
import Loading from "~/contexts/LoadingContext"

const ContextContainer = ({ children }) => {
    return (
        <>
            <Notification>
                <Loading>
                    {children}
                </Loading>
            </Notification>
        </>
    )
}

export default ContextContainer