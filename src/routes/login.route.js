const express = require('express');
const router = express.Router();
router.use(express.json());

const {obtenerUsuarios, agregarUsuario} = require('../models/usuario.model');



/**
 * @swagger
 * /login:
 *      post:
 *          summary: Digite correctamente sus datos
 *          tags: [login]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/login'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: login correcto
 *                      content:
 *                          'aplication/json': {}
 *                          
 *
 *                  400:
 *                      description: acceso invalido
 *                      content:
 *                          'aplication/json': {}
 *                          
 */


 router.post('/', (req, res) => {
    const {username, password} = req.body; 
    const login = obtenerUsuarios().find(u => u.username === username);
    if(login){
        const validacionPassword = obtenerUsuarios().find(u => u.password === password);
        const validacionUsername = obtenerUsuarios().find(u => u.username === username);
        if(validacionPassword && validacionUsername){ res.json(` ${username} lOGIN CORRECTO`);
    
       }else res.status(401).json(`USUARIO O CONTRASEÑA INVALIDOS`);
    }else{
        res.status(400).json(` ${username} no se esta registrado en nuestro restaurante`)
    }
});


/**
 * @swagger
 * /login/{registro}:
 *  post:
 *      summary: Crea un usuario en el sistema
 *       
 *      tags: [login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          401:
 *              description: Usuario registrado o faltan algunos de los datos
 */




router.post('/:registro', (req, res) => {
    const id = obtenerUsuarios().length + 1;
    const isAdmin = false;
    const { username, password, email, direccion, telefono } = req.body;
    let usuarioNuevo={};
    if(username && password && email && direccion && telefono && !obtenerUsuarios().find(u => u.email === email) && !obtenerUsuarios().find(u => u.username === username) ){
        usuarioNuevo = {id,...req.body, isAdmin};
        agregarUsuario(usuarioNuevo);
        res.json('Usuario Registrado');
        res.sendStatus(201);
    }else res.status(404).json('el Usuario o Correo ya esta registrado o algunos de los datos no esta registrado');

        
})


/**
 * @swagger
 * tags:
 *  name: login
 *  description: Sección de registro e ingreso de Usuarios
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *              -username
 *              -password
 *          properties:
 *              username:
 *                  type: string
 *                  description: Usuario
 *              password:
 *                  type: string
 *                  description: Contraseña
 *          example:
 *              username: Nathan
 *              password: "12345"
 *      register:
 *          type: object
 *          required: 
 *              -username
 *              -password
 *              -email
 *              -telefono
 *              -direccion         
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre del usuario
 *              password:
 *                  type: string
 *                  description: Contraseña del usuario
 *              email:
 *                  type: string
 *                  description: Email del usuario
 *              telefono:
 *                  type: integer
 *                  description: Telefono del usuario
 *              isAdmin:
 *                  type: boolean
 *                  description: valor de administrador o cliente
 *              direccion:
 *                  type: string
 *                  description: Dirección usuario
 *          example:
 *              example:
 *              username: Dran
 *              password: sosmosdran
 *              email: drandigital@gmail.com
 *              telefono: 3156770183
 *              direccion: Cartagena
 *  
 */





module.exports = router;