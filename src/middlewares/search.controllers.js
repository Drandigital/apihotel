const Habitacion = require('../models/room.model');

exports.buscarHabitaciones = async (req, res) => {
    const { fechaInicio, fechaFin, huespedes, ciudad } = req.query;
    try {
        const habitaciones = await Habitacion.find({
            'hotel.ubicacion': ciudad,
            'reservas.fechaInicio': { $not: { $lte: fechaFin } },
            'reservas.fechaFin': { $not: { $gte: fechaInicio } },
            capacidad: { $gte: huespedes }
        }).populate('hotel');  

        res.send(habitaciones);
    } catch (error) {
        res.status(500).send(error);
    }
};
