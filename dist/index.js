import { getFromEnv } from "./utils/getFromEnv.js";
import { connectToMongoDb } from "./database/connectToMongo.js";
import { logBlueMsg, logErrMsg } from "./utils/console/log.js";
import { router } from "./router.js";
import { APP_NAME } from "./utils/constants.js";
import http from 'http';
import { Server } from "socket.io";
import { socket } from "./socket.js";
const { port, frontendUrl } = getFromEnv();
const server = http.createServer(router);
const io = new Server(server, {
    cors: {
        origin: frontendUrl,
        methods: ["GET", "POST"],
    },
});
await connectToMongoDb();
server.listen(port, () => logBlueMsg(`${APP_NAME} Api listening on port ${port}!`));
socket(io);
process.on('unhandledRejection', (err) => {
    logErrMsg("unhandledRejection" + err);
});
