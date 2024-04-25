import { Schema, model } from "mongoose";
const WhatsAppMessageSchema = new Schema({
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
});
export const WhatsAppMassageModel = model('WhatsAppMessage', WhatsAppMessageSchema);
