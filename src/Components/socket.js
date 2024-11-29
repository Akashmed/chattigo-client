import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000"); // Create a single connection

export default socket;