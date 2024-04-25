import * as dotenv from 'dotenv'

export const getFromEnv = () => {

    dotenv.config()

    const port = Number(process.env.PORT) || 3000
    const baseUrlWithPort = process.env.BASE_URL_WITH_PORT
    const frontendUrl = process.env.FRONTEND_URL_WITH_PORT
    const mode = process.env.MODE
    const mongoDBUrl = process.env.MONGO_DB_URL || ''

    return {
        port,
        baseUrlWithPort,
        frontendUrl,
        mongoDBUrl,
        mode
    }
}