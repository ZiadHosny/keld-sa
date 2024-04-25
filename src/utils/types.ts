export type RealEstate = {
    region: string,
    city: string,
    district: string,
    referenceNumber: number,
    dateOfBirth: string,
    dateOfHegira: string,
    propertyClassification: string,
    numberOfProperties: number,
    price: number,
    area: number
}

export type WhatsAppMessage = {
    sender: string,
    receiver: string,
    message: string,
    replay: string,
    deviceType: string,
}