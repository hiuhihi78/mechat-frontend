import { createContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import realTimeConnection from "~/api/baseRealTmeConnection";
import { REAL_TIME_ENDPOINT, REAL_TIME_METHOD } from "~/api/RealTimeEndpoints";

export const NotificationContext = createContext()

function Connection({ children }) {
    const auth = useAuthUser()
    const user = auth()
    const [notification, setNotification] = useState('')

    useEffect(() => {
        var userId = user?.userId
        if (userId === undefined) return;

        const connection = realTimeConnection(REAL_TIME_ENDPOINT.CONNECTION);
        connection.start().catch((error) => console.error(error))

        connection.on(REAL_TIME_METHOD.NOTIFICATION, (response) => {
            const data = JSON.parse(response)
            setNotification(data)
        })

        return () => {
            connection.stop();
        };

    }, [user])

    return (
        <NotificationContext.Provider value={notification}>
            {children}
        </NotificationContext.Provider>
    );
}

export default Connection;