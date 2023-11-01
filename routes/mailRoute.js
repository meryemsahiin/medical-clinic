import express from "express";
import * as mailController from "../controllers/mailController.js";


const router = express.Router();


router
    .route("/iletisim").post(mailController.sendMail)



export default router;