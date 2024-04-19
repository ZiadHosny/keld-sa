import { Schema, model } from "mongoose";
import { RealEstate } from "../utils/types.js";

const RealEstateSchema = new Schema<RealEstate>({
    region: {
        type: String,
        required: true,
    }, city: {
        type: String,
        required: true,
    }, district: {
        type: String,
        required: true,
    }, referenceNumber: {
        type: String,
        required: true,
    }, dateOfBirth: {
        type: String,
        required: true,
    }, dateOfHegira: {
        type: String,
        required: true,
    }, propertyClassification: {
        type: String,
        required: true,
    }, numberOfProperties: {
        type: Number,
        required: true,
    }, price: {
        type: String,
        required: true,
    }, area: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})


export const RealEstateModal = model('message', RealEstateSchema)