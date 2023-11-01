import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';


// const checkUser = async (req, res, next) => {
//     const token = req.cookies.jwt;
    
//     if(token) {
//         jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.locals.user = null;
//                 next();
//             } else {
//                 const user = await User.findById(decodedToken.userId);
//                 res.locals.user = user;
//                 res.locals.isAdmin = user.role === 'Admin';
//                 next();
//             }
//         })
//     } else {
//         res.locals.user = null;
//         next();
//     }
// }


const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.locals.isAdmin = false;
                res.locals.isDoctor = false; // Varsayılan olarak isDoctor false olarak ayarlandı
                next();
            } else {
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                res.locals.isAdmin = user.role === 'Admin';
                
                // Kullanıcı bir doktor mu kontrol etmek için doktor koleksiyonunu sorgula
                const doctor = await Doctor.findOne({ email: user.email });
                res.locals.isDoctor = !!doctor; 
                const isAdmin = res.locals.isAdmin; // isAdmin'i al
                res.locals.isAdmin = isAdmin;// Kullanıcı bir doktor ise isDoctor true, değilse false
                next();
            }
        });
    } else {
        res.locals.user = null;
        res.locals.isAdmin = false;
        res.locals.isDoctor = false; // Varsayılan olarak isDoctor false olarak ayarlandı
        next();
    }
}



const authenticateToken = async (req, res, next) => {
    
    try {

        const token = req.cookies.jwt;

        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err) {
                    console.log(err.message);
                    res.redirect("/dashboard/login")
                } else {
                    next()
                }
            })
        } else {
            res.redirect("/dashboard/login")
        }

    } catch (error) {
        res.status(401).json({
            succeeded: false,
            error: "Not authorized"
        })
    }

    
}

export {authenticateToken, checkUser};