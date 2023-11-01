import upload from '../middlewares/lib/upload.js';
import Doctor from '../models/doctorModel.js';
import multer from 'multer';


const createDoctor = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Dosya yüklenemedi.' });
      }
      console.log(req.file);

      const doctorData = req.body;

      console.log(doctorData)

      if (req.file) {
        doctorData.avatar = {
          data: req.file.buffer, 
          contentType: req.file.mimetype 
        };
      }

      console.log(doctorData)

      const doctor = await Doctor.create(doctorData);
      res.status(201).json({ doctor: doctor._id });
    });
  } catch (error) {
    let errors2 = {};

    if (error.code === 11000) {
      errors2.email = "The Email is already registered";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors2[key] = error.errors[key].message;
      });
    }

    res.status(400).json(errors2);
  }
};

export { createDoctor };
