const Habitacion = require('../models/room.model');

exports.crearHabitacion = async (req, res) => {
    try {
        const habitacion = new Habitacion(req.body);
        await habitacion.save();
        res.status(201).send(habitacion);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.modificarHabitacion = async (req, res) => {
    try {
        const habitacion = await Habitacion.findByIdAndUpdate(req.params.idHabitacion, req.body, { new: true });
        if (!habitacion) {
            return res.status(404).send();
        }
        res.send(habitacion);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.alternarEstadoHabitacion = async (req, res) => {
    try {
        const habitacion = await Habitacion.findById(req.params.idHabitacion);
        if (!habitacion) {
            return res.status(404).send();
        }
        habitacion.estado = !habitacion.estado;
        await habitacion.save();
        res.send(habitacion);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.obtenerHabitacionesPorHotel = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find({ hotel: req.params.idHotel });
        res.send(habitaciones);
    } catch (error) {
        res.status(500).send(error);
    }
};
