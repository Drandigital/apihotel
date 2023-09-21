const Reservacion = require('../models/reservation.model');
const Habitacion = require('../models/room.model');
const emailServicio = require('./emailServicio');  
exports.crearReservacion = async (req, res) => {
    try {
        const { habitacionId, detallesHuésped, contactoEmergencia } = req.body;

        const habitacion = await Habitacion.findById(habitacionId);
        if (!habitacion) {
            return res.status(404).send({ error: 'Habitación no encontrada.' });
        }

        const reservacion = new Reservacion({
            habitacion: habitacionId,
            detallesHuésped,
            contactoEmergencia
        });
        await reservacion.save();

       
        emailServicio.enviarNotificacionReservacion(detallesHuésped.email, reservacion);

        res.status(201).send(reservacion);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.obtenerReservacionesPorHotel = async (req, res) => {
    try {
        const reservaciones = await Reservacion.find({ "habitacion.hotel": req.params.idHotel });
        res.send(reservaciones);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.obtenerDetallesReservacion = async (req, res) => {
    try {
        const reservacion = await Reservacion.findById(req.params.idReservacion).populate('habitacion');
        if (!reservacion) {
            return res.status(404).send({ error: 'Reservación no encontrada.' });
        }
        res.send(reservacion);
    } catch (error) {
        res.status(500).send(error);
    }
};
