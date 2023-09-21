require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
require('./db');


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const expressJwt = require('express-jwt');
const swaggerOptions = require('./utils/swaggerOptions');
const rutasHotel = require('./routes/hotel.routes');
const rutasHabitacion = require('./routes/room.routes');
const rutasReserva = require('./routes/reservation.routes');
const middlewareAutenticacion = require('./middlewares/auth.middlewares');


const app = express();
exports.app = app;
app.use(helmet());
const PORT = process.env.PORT || 3000;


const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use('/hotel', rutasHotel);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));


 
 


// middlewares
// app.use(middlewareAutenticacion.autenticar);




// Establecer las rutas
app.use('/hoteles', rutasHotel);
app.use('/habitaciones', rutasHabitacion);
app.use('/reservas', rutasReserva);




app.listen(PORT, () => { console.log(`Escuchando desde el puerto:  http://localhost:${PORT}`); });

module.exports = app;

