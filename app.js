import { dirname } from 'path';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import express from "express";
import dotenv from "dotenv"
import conn from "./db.js"
import cookieParser from "cookie-parser"
import methodOverride from "method-override"


import { checkUser } from "./dashboard/middlewares/authMiddleware.js";

import pageRoute from "./routes/pageRoute.js";
import aptRoute from "./routes/aptRoute.js";
import adminRoute from "./dashboard/routes/adminRoute.js"
import userRoute from "./dashboard/routes/userRoute.js"
import doctorRoute from "./dashboard/routes/doctorRoute.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

conn();





const app = express();
const adminApp = express();
const port = 4000;
const adminPort = 8000; // Yeni ekledim

// EJS TEMPLATE ENGINE
app.set("view engine", "ejs");
adminApp.set("view engine", "ejs");

// STATIC FILES MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method', {
  methods: ['POST', 'GET'],
}))

adminApp.use(express.json());
adminApp.use(express.urlencoded({ extended: true }));
adminApp.use(cookieParser());
adminApp.use(methodOverride('_method', {
  methods: ['POST', 'GET'],
}))

// STATIC FILES FOR ADMIN PANEL
adminApp.set("views", path.join(__dirname, "dashboard", "views"));
adminApp.use("/dashboard/assets", express.static(path.join(__dirname, "dashboard", "assets")));

// ROUTES
// app.use("/dashboard/*", checkUser);
app.use("/", pageRoute);
app.use("/randevu", aptRoute);

// SERVER LISTENING
app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});

// ADMIN PANEL ROUTES
adminApp.use("/dashboard/*", checkUser); // ADMIN PANEL için ayrı bir middleware ekledim
adminApp.use("/dashboard", adminRoute, userRoute, doctorRoute);

// SERVER LISTENING FOR ADMIN PANEL
adminApp.listen(adminPort, () => {
  console.log(`Admin panel running on port: ${adminPort}`);
});
