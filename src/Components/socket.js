import { io } from "socket.io-client";

const socket = io("https://chattigo-server.up.railway.app", {
    transports: ['websocket', 'polling'], // Allow both WebSocket and HTTP long-polling
    reconnectionAttempts:5,
});

export default socket;