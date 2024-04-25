import * as express from "express";
import { addRealEstateFromExcelFile, getRealEstates } from "./realEstate.controller.js";
const router = express.Router();
router.get('/excel', addRealEstateFromExcelFile);
router.get('/', getRealEstates);
export const realEstateRouter = router;
