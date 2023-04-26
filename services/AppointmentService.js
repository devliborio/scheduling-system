const appointment = require('../models/Appointment');
const mongoose = require('mongoose');
const AppointmentFactory = require('../factories/AppointmentFactory');

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

    async GetAll(showFinished) { // Método que vai ser usado no sistema de busca de consultas, e também na exibição das consultas.

        if (showFinished) { // Se for para mostrar todas as consultas inclusive as que já estão finalizadas:
            return await Appo.find();

        } else { // Caso não seja para exibir as consultas que já estão finalizadas:
            let appos = await Appo.find({ 'finished': false });
            let appointments = [];

            appos.forEach(appointment => {
                if (appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            });

            return appointments;
        }

    }

}

module.exports = new AppointmentService();