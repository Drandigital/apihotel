const express = require('express');
const router = express();
router.use(express.json());
const { obtenerUsuarios, verificarAdmin } = require('../models/usuario.model');


const verificarIfAdmin = (req, res, next) => {
    const usuario = req.auth.user;
    const contrasena = req.auth.password;
    const userIndex = obtenerUsuarios().findIndex(u => u.username === usuario && u.password === contrasena);
     if(userIndex >= 0) {
         if(verificarAdmin(userIndex)) next();
         else res.status(401).json('Unauthorized: El usuario no es administrador');
     }
     else res.json('El usuario no existe');
}

module.exports = verificarIfAdmin;