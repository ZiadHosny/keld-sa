import { catchAsyncError } from "../../utils/AppError.js";
import fs from 'fs';
// @ts-ignore
import { NlpManager } from 'node-nlp';
import { RealEstateModel } from "../../models/realEstate.model.js";
import { regions } from "../../utils/constants.js";
export const connectToNlp = catchAsyncError(async (req, res) => {
    const manager = new NlpManager({ languages: 'ar', forceNER: true, nlu: { log: true } });
    // high
    manager.addDocument('ar', 'مرتفع', 'high');
    manager.addDocument('ar', 'غالي', 'high');
    manager.addDocument('ar', 'غال', 'high');
    manager.addDocument('ar', 'عالي', 'high');
    manager.addDocument('ar', 'اعلي', 'high');
    manager.addDocument('ar', 'اكبر', 'high');
    manager.addDocument('ar', 'كبيرة', 'high');
    // low
    manager.addDocument('ar', 'اصغر', 'low');
    manager.addDocument('ar', 'اقل', 'low');
    manager.addDocument('ar', 'صغيرة', 'low');
    manager.addDocument('ar', 'منخفض', 'low');
    manager.addDocument('ar', 'رخيص', 'low');
    manager.addDocument('ar', 'قليل', 'low');
    manager.addDocument('ar', 'خفيف', 'low');
    await manager.train();
    manager.save();
    res.json({ message: 'Connect to Nlp Successfully' });
});
export const tryWords = catchAsyncError(async (req, res) => {
    const message = req.body.message;
    const manager = new NlpManager();
    // const city = message.
    const splitMessage = message.split(' ');
    const region = regions.find((region) => {
        return splitMessage.includes(region);
    });
    const filter = { region: { $regex: region } };
    const realEstates = await RealEstateModel.findOne(filter);
    if (fs.existsSync('./model.nlp')) {
        manager.load('./model.nlp');
    }
    const response = await manager.process('ar', message);
    // console.log(response);
    const intent = response.intent;
    if (intent === "None") {
        return res.json({ message: 'لا افهمك برجاء اعادة المحاولة' });
    }
    res.json({ message: 'Connect to Nlp Successfully', score: response.score, intent: response.intent });
});
