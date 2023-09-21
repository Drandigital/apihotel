// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const CLAVE_SECRETA = process.env.CLAVE_SECRETA;

// exports.autenticar = (req, res, next) => {
    
//     const bearerHeader = req.headers['authorization'];
//     if (!bearerHeader) {
//         return res.status(401).json({ message: 'Se necesita token de autenticación.' });
//     }
//     const token = bearerHeader.split('')[1];  // Extracting token from 'Bearer <token>' format
    
//     if (!token) {
//         return res.status(401).send({ error: 'Por favor, proporcione un token de autenticación válido.' });
//     }

//     try {
//         const decodificado = jwt.verify(token, CLAVE_SECRETA);
//         req.usuario = decodificado;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Por favor, autentíquese.' });
//     }
// };
