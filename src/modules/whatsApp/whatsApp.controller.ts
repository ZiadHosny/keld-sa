import { Request, Response } from "express"
import { catchAsyncError } from "../../utils/AppError.js"

export const connectToWhatsApp = catchAsyncError(async (req: Request, res: Response) => {

    res.json({ message: 'Connect to Whatsapp Successfully' });
})



