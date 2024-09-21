import * as signalR from '@microsoft/signalr';
import { getAccessToken } from '~/utils/cookie.util';

const realTimeConnection = (endpoint) => {
    return new signalR.HubConnectionBuilder()
        .withUrl(`${endpoint}`, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
            accessTokenFactory: () => getAccessToken(),
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
}

export default realTimeConnection;