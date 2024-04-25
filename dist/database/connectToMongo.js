import mongoose from "mongoose";
import { getFromEnv } from "../utils/getFromEnv.js";
import { logErrMsg, logErrInfoMsg, logSuccessMsg } from "../utils/console/log.js";
export const connectToMongoDb = async () => {
    const { mongoDBUrl } = getFromEnv();
    try {
        await mongoose.connect(mongoDBUrl);
        logSuccessMsg(`Connect To Mongo DB Successfully`);
    }
    catch (err) {
        logErrMsg('Error when connect to Mongo DB');
        logErrInfoMsg(err);
    }
};
