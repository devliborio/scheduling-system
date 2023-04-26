class AppointmentFactory {

    Build(simpleAppointment) {

        let day = simpleAppointment.date.getDate() + 1; // Pegando dia do objeto Date().
        let month = simpleAppointment.date.getMonth(); // Pegando o mês do objeto Date().
        let year = simpleAppointment.date.getFullYear(); // Pegando o ano do objeto Date().
        let hour = Number.parseInt(simpleAppointment.time.split(":")[0]); // Pegando hora do objeto time().
        let minutes = Number.parseInt(simpleAppointment.time.split(":")[1]); // Pegando minutos do objeto time().

        let startDate = new Date(year, month, day, hour, minutes, 0, 0);
        // startDate.setHours(startDate.getHours() - 3); // Realizando a correção do UTC para o horário correto do brasil

        let appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: startDate
        }

        return appo;

    }

}

module.exports = new AppointmentFactory();