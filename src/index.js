const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');



app.set('port', process.env.PORT || 3000, "192.168.0.107");

const autenticacion = require('./middlewares/Autenticacion.middleware');
const swaggerOptions = require('./utils/swaggerOptions');
const usuarioRoutes = require('./routes/usuario.route');
const pedidosRoutes = require('./routes/pedido.route');
const productoRoutes = require('./routes/producto.route');
const mediosRoutes = require('./routes/medioPago.route');
const loginRoutes = require('./routes/login.route');



app.use(express.json());

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/login', loginRoutes);
app.use(basicAuth({ authorizer: autenticacion }));
app.use('/usuarios', usuarioRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/producto', productoRoutes);
app.use('/medios', mediosRoutes)




app.listen(app.get('port'), () => {
    console.log('Escuchando en el Puerto ', app.get('port'));
  }
);
  

