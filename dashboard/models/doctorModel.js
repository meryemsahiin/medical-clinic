import mongoose from 'mongoose';
import validator from "validator";

const {Schema} = mongoose

const doctorSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Name area is required"],
        lowercase: true,
    },
    lastname: {
        type: String,
        required: [true, "Last Name area is required"],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email area is required"],
        unique: true,
        validate: [validator.isEmail, "Valid email is required"]
    },
    department: {
        type: String,
        enum: ['Cardiology', 'Eye Care'],
      },
    phone: {
        type: Number,
        required: [true, "Phone Number area is required"],
    },
    role: {
        type: String,
        enum: ['Doktor', 'Yönetici'],
        default: 'Doktor',
      },
      
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  address: {
    type: String,
  },
  avatar: {
    type: Object,
  },
},
{
    timestamps: true
})




const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
