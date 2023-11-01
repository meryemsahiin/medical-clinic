import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
        enum: ['Gynaecology', 'Cardiology', 'Orthopaedics', 'Medicine']
    },
    doctor: {
        type: String,
        required: true,
        enum: ['Naidan Smith', 'Danial Frankie', 'Jason Roy', 'Alexa Jhon']
    },
    patientName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true
    // },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
    },
    appointmentNote: {
        type: String
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
