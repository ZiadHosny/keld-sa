import pkg from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';
import { RealEstateModel } from "../models/realEstate.model.js";
const { Client, LocalAuth } = pkg;
const remotePath = `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html`;
const allSessionsObject = {};
const sendMessage = async (msg) => {
    const realEstates = await RealEstateModel.findOne({ city: msg.body });
    console.log(realEstates);
    // const response = await manager.process('ar', msg.body);
    // console.log(response)
    // const answer = response.intent
    if (realEstates) {
        await msg.reply(`${realEstates.region}
            مدينة : ${realEstates.city}
            حي : ${realEstates.district} 
            تاريخ الصفقة ميلادي : ${realEstates.dateOfBirth}
            تاريخ الصفقة هجري : ${realEstates.dateOfHegira}
            عدد العقارات : ${realEstates.numberOfProperties}
            تصنيف العقار : ${realEstates.propertyClassification}
            سعر العقار : ${realEstates.price}
            مساحة العقار : ${realEstates.area}
        `);
    }
    await msg.reply('Hello From Ziad');
    // await WhatsAppMassageModel.create({
    //     deviceType: msg.deviceType,
    //     replay: 'answer',
    //     message: msg.body,
    //     sender: msg.from,
    //     receiver: msg.to
    // })
};
export const connectToWhatsApp = async (id, socket) => {
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: id
        }),
        webVersionCache: {
            type: 'remote',
            remotePath,
        }
    });
    client.on("authenticated", () => {
        console.log("AUTHENTICATED");
    });
    client.on('disconnected', (reason) => {
        console.log("whatsapp disconnected", reason);
        client.initialize().catch(err => console.log(err));
    });
    client.on("qr", (qr) => {
        console.log(qr);
        qrcode.generate(qr, { small: true });
        socket.emit("qr", {
            qr,
        });
    });
    client.on("ready", () => {
        console.log("Client is ready!");
        allSessionsObject[id] = client;
        socket.emit("ready", { id, message: "Client is ready!" });
    });
    client.on("remote_session_saved", () => {
        console.log("remote_session_saved");
        socket.emit("remote_session_saved", {
            message: "remote_session_saved",
        });
    });
    client.on("message", async (msg) => {
        try {
            await sendMessage(msg);
        }
        catch (error) {
            console.error(error);
        }
    });
    client.initialize().catch(err => console.log(err));
};
export const getWhatsappSession = async (id, socket) => {
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: id,
        }),
        webVersionCache: {
            type: 'remote',
            remotePath,
        }
    });
    client.on("authenticated", () => {
        console.log("AUTHENTICATED");
    });
    client.on('disconnected', () => {
        console.log("whatsapp disconnected");
    });
    client.on("ready", () => {
        console.log("client is ready");
        socket.emit("ready", {
            id,
            message: "client is ready",
        });
    });
    client.on("qr", (qr) => {
        socket.emit("qr", {
            qr,
            message: "your got logged out and here is QR code",
        });
    });
    client.on("message", async (msg) => {
        try {
            await sendMessage(msg);
        }
        catch (error) {
            console.error(error);
        }
    });
    client.initialize().catch(err => console.log(err));
};
// const manager = new NlpManager({ languages: 'ar', forceNER: true, nlu: { log: true } })
// manager.addDocument('ar', 'اعلي سعر', 'price.high');
// manager.addDocument('ar', 'اكبر سعر', 'price.high');
// manager.addDocument('ar', 'اكبر صفقة', 'price.high');
// manager.addDocument('ar', 'اعلي صفقة', 'price.high');
// manager.addDocument('ar', 'صفقة كبيرة', 'price.high');
// manager.addDocument('ar', 'اقل سعر', 'price.low');
// manager.addDocument('ar', 'اصغر سعر', 'price.low');
// manager.addDocument('ar', 'اصغر صفقة', 'price.low');
// manager.addDocument('ar', 'اقل صفقة', 'price.low');
// manager.addDocument('ar', 'صفقة صغيرة', 'price.low');
// Add training data
// manager.addDocument('ar', 'السعر مرتفع', 'price.high');
// manager.addDocument('ar', 'السعر غالي', 'price.high');
// manager.addDocument('ar', 'غالي جداً', 'price.high');
// manager.addDocument('ar', 'سعر السلعة غالي', 'price.high');
// manager.addDocument('ar', 'سعر السلعة مرتفع', 'price.high');
// manager.addDocument('ar', 'سعر عالي', 'price.high');
// manager.addDocument('ar', 'سعر اعلي', 'price.high');
// manager.addDocument('ar', ' اعلي', 'price.high');
// manager.addDocument('ar', 'السعر منخفض', 'price.low');
// manager.addDocument('ar', 'السعر رخيص', 'price.low');
// manager.addDocument('ar', 'سعر السلعة منخفض', 'price.low');
// manager.addDocument('ar', 'سعر السلعة رخيص', 'price.low');
// manager.addDocument('ar', 'سعر قليل', 'price.low');
// manager.addDocument('ar', 'سعر خفيف', 'price.low');
// (async () => {
//     await manager.train();
//     manager.save();
//     const response = await manager.process('ar', 'قليل سعر');
//     console.log(response);
// })();
