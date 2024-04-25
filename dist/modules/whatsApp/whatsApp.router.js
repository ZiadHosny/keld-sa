import * as express from "express";
import { connectToNlp, connectToWhatsApp } from "./whatsApp.controller.js";
const router = express.Router();
router.post('/connect', connectToWhatsApp);
router.post('/nlp', connectToNlp);
export const whatsAppRouter = router;
