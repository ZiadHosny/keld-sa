import { Schema, model } from "mongoose";
const RealEstateSchema = new Schema({
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
        type: Number,
        required: true,
        unique: true,
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
        type: Number,
        required: true,
    }, area: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});
export const RealEstateModel = model('realEstate', RealEstateSchema);
