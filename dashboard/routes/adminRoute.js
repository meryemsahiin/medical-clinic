import express from "express";
import * as adminController from "../controllers/adminController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();


// Giriş ve Kayıt sayfaları her zaman erişilebilir
router.route("/login").get(adminController.getLoginPage);
router.route("/register").get(adminController.getRegisterPage);



router.route("/").get(authMiddleware.authenticateToken, adminController.getIndexPage);
router.route("/logout").get(authMiddleware.authenticateToken, adminController.getLogout);
router.route("/doctors").get(authMiddleware.authenticateToken, adminController.getDoctorsPage);
router.route("/patients").get(authMiddleware.authenticateToken, adminController.getPatientsPage);
router.route("/appointments").get(authMiddleware.authenticateToken, adminController.getAppointmentsPage);
router.route("/settings").get(authMiddleware.authenticateToken, adminController.getSettingsPage);
router.route("/departments").get(authMiddleware.authenticateToken, adminController.getDepartmentsPage);
router.route("/add-department").get(authMiddleware.authenticateToken, adminController.getAddDepartmentPage);
router.route("/add-doctor").get(authMiddleware.authenticateToken, adminController.getAddDoctorPage);
router.route("/profile").get(authMiddleware.authenticateToken, adminController.getProfilePage);
router.route("/edit-profile").get(authMiddleware.authenticateToken, adminController.getEditProfilePage);
router.route("/:id").get(authMiddleware.authenticateToken, adminController.getDoctorProfilePage);
router.route("/error-404").get(authMiddleware.authenticateToken, adminController.getErrorPage);
router.route("/error-500").get(authMiddleware.authenticateToken, adminController.getError2Page);

export default router;
