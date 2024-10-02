import Connection from "./Connection";

function RealTimeContext({ children }) {
    return (
        <>
            <Connection>
                {children}
            </Connection>
        </>
    );
}

export default RealTimeContext;