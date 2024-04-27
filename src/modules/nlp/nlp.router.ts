import express from "express";
import { connectToNlp, tryWords } from "./nlp.controller.js";

const router = express.Router()

router.post('/', connectToNlp)
router.post('/try', tryWords)

export const nlpRouter = router