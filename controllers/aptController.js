import Appointment from "../models/aptModel.js";

// const createAppointment = async (req, res) => {
//     try {
//         const {
//             department,
//             doctor,
//             patientName,
//             phoneNumber,
//             appointmentDate,
//             appointmentTime,
//             appointmentNote
//         } = req.body;

//         // 'appointmentDate'yi tarihe çevirin
//         const parsedDate = new Date(appointmentDate);

//         const appointment = new Appointment({
//             department,
//             doctor,
//             patientName,
//             phoneNumber,
//             appointmentDate: parsedDate, // Tarihi güncel değeri ile ayarlayın
//             appointmentTime,
//             appointmentNote
//         });

//         const savedAppointment = await appointment.save();

//         res.status(201).json({ message: 'Randevu oluşturuldu', appointment: savedAppointment });
//     } catch (error) {
//         console.log("error", error);
//         res.status(500).json({ error: 'Randevu oluşturulurken bir hata oluştu' });
//     }
// };


const createAppointment = async (req, res) => {
    try {
        const {
            department,
            doctor,
            patientName,
            phoneNumber,
            appointmentDate,
            appointmentTime,
            appointmentNote
        } = req.body;

        const appointment = new Appointment({
            department,
            doctor,
            patientName,
            phoneNumber,
            appointmentDate,
            appointmentTime,
            appointmentNote
        });

        await appointment.save();
        const successMessage = 'Randevu oluşturuldu';

        // Randevu oluşturulduktan sonra aynı sayfada kalmak için res.render kullanın
        res.status(201).redirect('/randevu-al')
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Randevu oluşturulurken bir hata oluştu' });
    }
};

export { createAppointment };
