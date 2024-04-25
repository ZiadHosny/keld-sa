import { Schema, model } from "mongoose";
import { WhatsAppMessage } from "../utils/types.js";

const WhatsAppMessageSchema = new Schema<WhatsAppMessage>({
    sender: {
        type: String,
        required: true,
    }, receiver: {
        type: String,
        required: true,
    }, message: {
        type: String,
        required: true,
    }, replay: {
        type: String,
        required: true,
    }, deviceType: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

export const WhatsAppMassageModel = model('WhatsAppMessage', WhatsAppMessageSchema)