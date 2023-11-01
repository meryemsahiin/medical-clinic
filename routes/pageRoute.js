import express from "express";
import * as pageController from "../controllers/pageController.js"; 
import * as mailController from "../controllers/mailController.js";

const router = express.Router();


router.route("/").get(pageController.getIndexPage);
router.route("/hakkimizda").get(pageController.getAboutPage);
router.route("/iletisim").get(pageController.getContactPage);
router.route("/bloglar").get(pageController.getBlogsPage);
router.route("/blog").get(pageController.getBlogPage);
router.route("/randevu-al").get(pageController.getAppointmentPage)
router.route("/angioplasty-services").get(pageController.getAngioplastyPage)
router.route("/cardiology-services").get(pageController.getCardiologyPage)
router.route("/endocrinology-services").get(pageController.getEndocrinologyPage)
router.route("/eye-care-services").get(pageController.getEyeCarePage)
router.route("/nurology-service").get(pageController.getNurologyPage)
router.route("/orthopaedics-services").get(pageController.getOrthopaedicsPage)
router.route("/doktorlar").get(pageController.getDoctorsPage);
router.route("/doktorumuz").get(pageController.getDoctorPage);
router
    .route("/iletisim").post(mailController.sendMail);

export default router;