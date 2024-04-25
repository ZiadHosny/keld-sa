import { connectToWhatsApp, getWhatsappSession } from "./utils/whatsapp.js";
import { logBlueMsg, logErrMsg, logSuccessMsg } from "./utils/console/log.js";
export const socket = (io) => {
    io.on('connection', (socket) => {
        logBlueMsg(`a user connected ${socket.id}`);
        socket.on("disconnect", () => {
            logErrMsg("user disconnected");
        });
        socket.on("connected", (data) => {
            logSuccessMsg(`connected to the server ${data}`);
            socket.emit("hello", "Hello from server");
        });
        socket.on("createSession", (data) => {
            console.log(data);
            const { id } = data;
            connectToWhatsApp(id, socket);
        });
        socket.on("getSession", (data) => {
            console.log(data);
            const { id } = data;
            getWhatsappSession(id, socket);
        });
    });
};
