import express from "express"
import cors from 'cors'
import morgan from 'morgan'
import baseRouter from "./modules/baseRouter.js"
import invalidRouter from "./modules/invalidRouter.js"
import { globalErrorMiddleware } from "./middleware/globalError.js"
import { getFromEnv } from "./utils/getFromEnv.js"
import { realEstateRouter } from "./modules/realEstate/realEstate.router.js"
import { whatsAppRouter } from "./modules/whatsApp/whatsApp.router.js"

const { mode } = getFromEnv()
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

if (mode == "dev") {
    app.use(morgan("dev"));
}

//routes
app.use('/api', baseRouter)
app.use('/api/realEstate', realEstateRouter)
app.use('/api/whatsApp', whatsAppRouter)

app.use('/', (req, res) => {
    res.redirect('/api');
})
// default Routes
app.use('*', invalidRouter)
app.use(globalErrorMiddleware)

export const router = app

