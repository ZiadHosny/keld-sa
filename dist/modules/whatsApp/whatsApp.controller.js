import { catchAsyncError } from "../../utils/AppError.js";
import { startClient } from "../../utils/whatsapp.js";
// @ts-ignore
import { NlpManager } from 'node-nlp';
export const connectToWhatsApp = catchAsyncError(async (req, res) => {
    startClient('ziad');
    res.json({ message: 'Connect to Whatsapp Successfully' });
});
export const connectToNlp = catchAsyncError(async (req, res) => {
    const manager = new NlpManager({ languages: 'ar', forceNER: true, nlu: { log: true } });
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
    res.json({ message: 'Connect to Nlp Successfully' });
});
