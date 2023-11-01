import User from "../models/userModel.js"
import Doctor from "../models/doctorModel.js"
import mongoose from "mongoose"


const getIndexPage = (req, res) => {
    res.render("index", {
        link: "index",
    })
}

const getLoginPage = (req, res) => {
    res.render("login", {
        link: "login",
    })
}

const getRegisterPage = (req, res) => {
    res.render("register", {
        link: "register",
    })
}

const getLogout = (req, res) => {
    res.clearCookie('jwt', {
        path: "/dashboard",
        expires: new Date(0)
    });
    res.redirect("/dashboard/login");
}

const getDoctorsPage = async (req, res) => {
    try {
      // Kullanıcıları ve doktorları veritabanından çekin
      const users = await User.find();
      const doctors = await Doctor.find();

            // Kullanıcının rolünü çerezden alın
    const userRole = req.cookies.role;

    console.log(userRole)

    // Kullanıcının rolüne göre ilgili değişkeni ayarlayın
    let admin = null;
    let doctor = null;

    if (userRole == "Admin") {
      admin = userRole;
    } else if (userRole == "Doktor") {
      doctor = userRole;
    }


    
      const matchedUsersAndDoctors = [];

      for (const user of users) {
        for (const doctor of doctors) {
          if (user.email === doctor.email) {
            matchedUsersAndDoctors.push({ user, doctor });
          }
        }
      }
      res.render("doctors", {
        matchedUsersAndDoctors,
        admin : admin,
        doctor: doctor,
        link: "doctors"
      });
    } catch (error) {
      console.error("Hata:", error);
      // Hata durumunda uygun bir hata işleme mekanizması ekleyebilirsiniz.
      res.status(500).send("Bir hata oluştu.");
    }
  };


const getPatientsPage = (req, res) => {
    res.render("patients", {
        link: "patients",
    })
}

const getAppointmentsPage = (req, res) => {
    res.render("appointments", {
        link: "appointments",
    })
}

const getSettingsPage = (req, res) => {
    res.render("settings", {
        link: "settings",
    })
}

const getDepartmentsPage = (req, res) => {
    res.render("departments", {
        link: "departments",
    })
}

const getAddDoctorPage = (req, res) => {
    res.render("add-doctor", {
        link: "add-doctor",
    })
}


const getProfilePage = async (req, res) => {
    const userEmail = res.locals.user.email; 
    const user = await User.findOne({ email: userEmail });
    
    const doctor = await Doctor.findOne({ email: userEmail });



    res.render("profile", {
        user: user, 
        doctor: doctor, 

        link: "profile",
    });
}


const getEditProfilePage = (req, res) => {
    res.render("edit-profile", {
        link: "edit-profile",
    })
}

const getDoctorProfilePage = async (req, res) => {
    try {
        // const doctor = await Doctor.findById({ _id: req.params.id });
        const doctorId = req.params.id; // Parametreden doktor kimliğini alın
const doctor = await Doctor.findById(doctorId);

  
      if (!doctor) {
    
        return res.status(404).render("error-404", { message: "Doktor bulunamadı." });
      }
  
    
      const user = await User.findOne({ email: doctor.email });
  
      if (!user) {
        
        return res.status(404).render("error-404", { message: "Kullanıcı bulunamadı." });
      }
  
      const isAdmin = res.locals.isAdmin;
      const isDoctor = res.locals.isDoctor;
  

      res.render("doctor-profile", {
        doctorId,
        user: user,
        doctor: doctor,
        isAdmin,
        isDoctor,
        link: "doctor-profile",
      });
    } catch (err) {
      console.error(err);

      res.status(500).render("error-500", { message: "Sunucu hatası." });
    }
  };
  
const getAddDepartmentPage = (req, res) => {
    res.render("add-department", {
        link: "add-department",
    })
}  
  
const getErrorPage = (req, res) => {
    res.render("error-404", {
        link: "error-404",
    })
}  

const getError2Page = (req, res) => {
    res.render("error-500", {
        link: "error-500",
    })
}  


export {getLoginPage, getIndexPage, getDoctorsPage, getRegisterPage, getLogout, getPatientsPage, getAppointmentsPage, getSettingsPage, getDepartmentsPage, getAddDoctorPage, getProfilePage, getEditProfilePage, getDoctorProfilePage, getErrorPage, getError2Page, getAddDepartmentPage};
