const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appointmentService = require('./services/AppointmentService');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/scheduling')

// Routes
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/cadastro', (req, res) => {
    res.render("create");
})

app.get('/getcalendar', async (req, res) => {
    let consultas = await appointmentService.GetAll(false); // Definindo a variável showFinished como false ele só irá exibir as consultas que não estão finalizadas.
    res.json(consultas);
})

app.post('/create', async (req, res) => {

    let status = await appointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    )

    if (status) {
        res.redirect("/");
    } else {
        res.status(400);
        res.send('Ocorreu uma falha na criação da consulta!');
    }

});

app.listen(9090, (req, res) => {
    console.log('Servidor Rodando!')
})
