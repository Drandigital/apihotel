const mongoose = require('mongoose');
const { reservaEsquema } = require('./reservaEsquema');

const Reserva = mongoose.model('Reserva', reservaEsquema);

module.exports = Reserva;
