import pkg from "whatsapp-web.js"
import qrcode from 'qrcode-terminal'
import { WhatsAppMassageModel } from "../models/whatsApp.model.js";
// @ts-ignore
import { NlpManager } from 'node-nlp'

const { Client, LocalAuth } = pkg

export const startClient = async (id: string) => {
    // const { mongoDBUrl } = getFromEnv()
    // const connected = await mongoose.connect(mongoDBUrl)
    // const store = new MongoStore({ mongoose: connected });

    const manager = new NlpManager({ languages: 'ar', forceNER: true, nlu: { log: true } })

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
    manager.addDocument('ar', 'السعر مرتفع', 'price.high');
    manager.addDocument('ar', 'السعر غالي', 'price.high');
    manager.addDocument('ar', 'غالي جداً', 'price.high');
    manager.addDocument('ar', 'سعر السلعة غالي', 'price.high');
    manager.addDocument('ar', 'سعر السلعة مرتفع', 'price.high');
    manager.addDocument('ar', 'سعر عالي', 'price.high');
    manager.addDocument('ar', 'سعر اعلي', 'price.high');
    manager.addDocument('ar', ' اعلي', 'price.high');

    manager.addDocument('ar', 'السعر منخفض', 'price.low');
    manager.addDocument('ar', 'السعر رخيص', 'price.low');
    manager.addDocument('ar', 'سعر السلعة منخفض', 'price.low');
    manager.addDocument('ar', 'سعر السلعة رخيص', 'price.low');
    manager.addDocument('ar', 'سعر قليل', 'price.low');
    manager.addDocument('ar', 'سعر خفيف', 'price.low');

    (async () => {
        await manager.train();
        manager.save();
        const response = await manager.process('ar', 'قليل سعر');
        console.log(response);
    })();


    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: id
        }),
        webVersionCache: {
            type: 'remote',
            remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html`
        }
    })

    client.initialize().catch(err => console.log(err))

    client.on("qr", (qr) => {
        console.log(qr)
        qrcode.generate(qr, { small: true })
    })

    client.on("ready", () => console.log("Client is ready!"))

    client.on("message", async (msg) => {
        try {

            const response = await manager.process('ar', msg.body);
            console.log(response)
            const answer = response.intent
            await msg.reply(response.intent)

            await WhatsAppMassageModel.create({
                deviceType: msg.deviceType,
                replay: answer,
                message: msg.body,
                sender: msg.from,
                receiver: msg.to
            })
        } catch (error) {
            console.error(error)
        }
    })
}