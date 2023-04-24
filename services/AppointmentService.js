const appointment = require('../models/Appointment');
const mongoose = require('mongoose');

const Appo = mongoose.model('Appointment', appointment); // Model

class AppointmentService {

    async Create(name, email, description, cpf, date, time) { // Método de criação de consultas.

        let newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        });

        try {
            await newAppo.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

}

module.exports = new AppointmentService();