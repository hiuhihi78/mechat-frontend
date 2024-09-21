import Notification from "./Notification";

function RealTimeContext({ children }) {
    return (
        <>
            <Notification>
                {children}
            </Notification>
        </>
    );
}

export default RealTimeContext;