import express from "express";
import { connectToWhatsApp } from "./whatsApp.controller.js";

const router = express.Router()

router.post('/connect', connectToWhatsApp)


export const whatsAppRouter = router