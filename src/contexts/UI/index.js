import Loading from "./LoadingContext";
import Notification from "./NotificationContext";

function UIContextContainer({ children }) {
    return (
        <>
            <Notification>
                <Loading>
                    {children}
                </Loading>
            </Notification>
        </>
    );
}

export default UIContextContainer;