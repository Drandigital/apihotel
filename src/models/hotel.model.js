const mongoose = require('mongoose');

const hotelEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        
    },
    ubicacion: {
        type: String,
        
    },
    estado: {
        type: Boolean,
        default: true
    },
    habitaciones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habitacion'
    }],
    
});

const Hotel = mongoose.model('Hotel', hotelEsquema);

module.exports = Hotel;
