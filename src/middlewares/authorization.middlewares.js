// const Hotel = require('../models/hotel.model');

// exports.verificarPropiedadHotel = async (req, res, next) => {
//     try {
//         const hotel = await Hotel.findById(req.params.idHotel);
//         if (!hotel) {
//             return res.status(404).send({ error: 'Hotel no encontrado.' });
//         }
//         if (hotel.propietario.toString() !== req.usuario._id.toString()) {  // Suponiendo que req.usuario._id está definido por el middleware de autenticación
//             return res.status(403).send({ error: 'Acceso denegado.' });
//         }
//         next();
//     } catch (error) {
//         res.status(500).send({ error: 'Error interno del servidor.' });
//     }
// };
