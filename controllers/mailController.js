import Mail from "../models/mailModel.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const gmail = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASSWORD;

const sendMail = async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      await Mail.create({ name, email, phone, subject, message});

      const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: gmail,
            pass: password 
        }
    });

    const mailOptions = {
        to: gmail,
        subject: 'Yeni Bir E-Posta Geldi',
        text: `Gönderen: ${email}\n\nMesaj: ${message}`
    };

    await transporter.sendMail(mailOptions);


    res.status(201).json({succeded:true});
    } catch (err) {
      console.error("Mesaj oluşturulurken hata oluştu:", err);
      res.status(500).send("Sunucu hatası");
    }
  };



export {sendMail};