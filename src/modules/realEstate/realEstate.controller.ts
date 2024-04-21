import { Request, Response } from "express"
import { catchAsyncError } from "../../utils/AppError.js"
import { readExcelFile } from "../../utils/excel.js"
import { RealEstateModel } from "../../models/realEstate.model.js"
import { RealEstate } from "../../utils/types.js"

export const addRealEstateFromExcelFile = catchAsyncError(async (req: Request, res: Response) => {

    const realEstatesFromExcel = await readExcelFile()

    const realEstates: RealEstate[] =
        realEstatesFromExcel.map(realEstate => {
            return {
                region: realEstate[0],
                city: realEstate[1],
                district: realEstate[2],
                referenceNumber: Number(realEstate[3]),
                dateOfBirth: realEstate[4],
                dateOfHegira: realEstate[5],
                propertyClassification: realEstate[6],
                numberOfProperties: Number(realEstate[7]),
                price: Number(realEstate[8]),
                area: Number(realEstate[9]),
            }
        })

    const exitingIds = await RealEstateModel.distinct('referenceNumber')

    const newRealEstates = realEstates.filter(item => !exitingIds.includes(item.referenceNumber))

    if (newRealEstates.length === 0) {
        return res.json({ message: 'No New Rows to add.' })
    }

    await RealEstateModel.insertMany(newRealEstates)

    res.json({ message: 'RealEstates Added Successfully' })
})

export const getRealEstates = catchAsyncError(async (req: Request, res: Response) => {

    const realEstates = await RealEstateModel.countDocuments({})

    res.json({ message: 'RealEstates Added Successfully', realEstates })
})