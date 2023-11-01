import express from "express";
import * as aptController from "../controllers/aptController.js";


const router = express.Router();


router
    .route("/randevu-al")
    .post(aptController.createAppointment)



export default router;