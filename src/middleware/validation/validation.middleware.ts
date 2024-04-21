import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { logBlueMsg } from "../../utils/console/log.js"
import { AppError } from "../../utils/AppError.js"

type ValidationProps = {
    schema: Joi.ObjectSchema,
    reqPart?: 'params' | 'body'
}

export const validation = ({ schema, reqPart = 'body' }: ValidationProps) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const body = JSON.parse(JSON.stringify(req[reqPart]))
        const { error } = schema.validate(body, { abortEarly: true })

        logBlueMsg(`Validation for request part:  ${reqPart}`);

        return error ?
            next(new AppError(error.message, 400, error.details)) :
            next()
    }
}