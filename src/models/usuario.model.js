const _ = require('lodash');

const usuarios = [
    {
        id: 1,
        username: "Nathan",
        password: "12345",
        email: "nathan@drandigital.com",
        direccion: "Cartagena",
        telefono: 3156770183,
        isAdmin: true
    },
    {
        id: 2,
        username: "Diana",
        password: "12345",
        email: "Diana@drandigital.com",
        direccion: "Cartagena",
        telefono: 3156770183,
        isAdmin: true
    },
    {
        id: 3,
        username: "Natan",
        password: "12345",
        email: "natan@drandigital.com",
        direccion: "Cartagena",
        telefono: 3156770183,
        isAdmin: false
    }
];

function obtenerUsuarios(){
    return usuarios;
    
}

const agregarUsuario = (usuarioNuevo) => {
    usuarios.push(usuarioNuevo);
}


const eliminarUsuarios = (eliminarUsuario) => {
    usuarios.splice(eliminarUsuario, 1, 'vacio');
}

const verificarAdmin = (User) => {
    return usuarios[User].isAdmin === true ? true : false; 
}


module.exports = {obtenerUsuarios, agregarUsuario,eliminarUsuarios,verificarAdmin}