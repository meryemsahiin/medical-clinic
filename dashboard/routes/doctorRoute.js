import express from "express";
import * as doctorController from "../controllers/doctorController.js";


const router = express.Router();


router.route('/add-doctor').post(doctorController.createDoctor)



export default router;