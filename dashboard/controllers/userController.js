import User from "../models/userModel.js";
import Doctor from '../models/doctorModel.js'; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const doctor = await Doctor.findOne({ email: userEmail });

    if (doctor) {
      const user = await User.create({ ...req.body });
      res.status(201).json({ user: user._id });
    } else {
      return res.status(500).json({ error: 'Geçersiz doktor e-posta adresi' });
    }
  } catch (error) {
    let errors = {};

    if (error.code === 11000) {
      errors.email = "E-posta zaten kayıtlı";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
    }

    res.status(400).json(errors);
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({
        succeded: false,
        error: "There is no such user",
      });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });

      res.status(201).json({
        succeded: true,
        user
      })
    } else {
      res.status(401).json({
        succeded: false,
        error: "Password are not matched!",
      });
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export { loginUser, createUser}