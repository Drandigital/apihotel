const mongoose = require('mongoose');

const reservaEsquema = new mongoose.Schema({
    fechaEntrada: {
        type: Date,
        _required: true,
        get required() {
            return this._required;
        },
        set required(value) {
            this._required = value;
        },
    },
    fechaSalida: {
        type: Date,
        required: true
    },
    cantidadPersonas: {
        type: Number,
        required: true
    },
    ciudadDestino: {
        type: String,
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habitacion',
        required: true
    },
    huéspedes: [{
        nombres: {
            type: String,
            required: true
        },
        apellidos: {
            type: String,
            required: true
        },
        fechaNacimiento: {
            type: Date,
            required: true
        },
        género: {
            type: String,
            required: true
        },
        tipoDocumento: {
            type: String,
            required: true
        },
        numeroDocumento: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        }
    }],
    contactoEmergencia: {
        nombresCompletos: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        }
    }
});
exports.reservaEsquema = reservaEsquema;
