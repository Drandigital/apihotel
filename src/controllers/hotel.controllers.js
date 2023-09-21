const Hotel = require('../models/hotel.model');

exports.crearHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.modificarHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.idHotel, req.body, { new: true });
        if (!hotel) {
            return res.status(404).send();
        }
        res.send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.alternarEstadoHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.idHotel);
        if (!hotel) {
            return res.status(404).send();
        }
        hotel.estado = !hotel.estado;
        await hotel.save();
        res.send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.obtenerHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.idHotel);
        if (!hotel) {
            return res.status(404).send();
        }
        res.send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
};
