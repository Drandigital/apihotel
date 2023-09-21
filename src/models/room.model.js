const mongoose = require('mongoose');

const habitacionEsquema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    costoBase: {
        type: Number,
        required: true
    },
    impuestos: {
        type: Number,
        required: true
    },
    tipoHabitacion: {
        type: String,
        required: true,
        enum: ['simple', 'doble', 'suite'] 
    },
    ubicacion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
});

const Habitacion = mongoose.model('Habitacion', habitacionEsquema);

module.exports = Habitacion;
