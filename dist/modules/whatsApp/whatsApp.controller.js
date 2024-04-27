import { catchAsyncError } from "../../utils/AppError.js";
export const connectToWhatsApp = catchAsyncError(async (req, res) => {
    res.json({ message: 'Connect to Whatsapp Successfully' });
});
