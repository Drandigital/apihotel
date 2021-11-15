const { obtenerUsuarios } = require('../models/usuario.model');

const autenticacion = (usuario, contrasena) => {
    const usuarioEncontrado = obtenerUsuarios().find(u => u.username === usuario && u.password === contrasena);
    if (usuarioEncontrado) return true;
    else return false;
}

module.exports = autenticacion;
