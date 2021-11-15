const express = require('express');
const router = express.Router();

const {obtenerUsuarios, agregarUsuario, eliminarUsuarios } = require('../models/usuario.model');


/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: Obtener todos los usuarios del sistema
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/usuario'
 */


 router.use('/', (req, res, next) => {
    if(obtenerUsuarios().some(u => u.username === req.auth.user && u.isAdmin == true)){
        return next();
        
    }else{
        return res.status(404).json(' Usted No es Administrador no puede ver la lista de usuarios');
    };
});
router.get('/', (req, res) => {
    res.json(obtenerUsuarios());
});




/**
 * @swagger
 * /usuarios:
 *  post:
 *      summary: Crea un usuario en el sistema
 *      tags: [Usuarios]
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
 *              description: usuario y contrasena incorrectos
 */
router.post('/', (req, res) => {
    const id = obtenerUsuarios().length + 1;
    const { username, password, email, direccion, telefono, isAdmin } = req.body;
    let usuarioNuevo={};
    if(username && password && email && direccion && telefono && isAdmin && !obtenerUsuarios().find(u => u.email === email) && !obtenerUsuarios().find(u => u.username === username) ){
        usuarioNuevo = {id, ...req.body};
        agregarUsuario(usuarioNuevo);
        res.json(usuarioNuevo);
        res.json('Usuario Registrado');
        res.sendStatus(201);
    }else res.status(404).json('el Usuario o Correo ya esta registrado o faltan datos de registro');

        
})

/**                   
* @swagger
* /usuarios:
*   put:
*       summary: Cambiar un Usuario.
*       tags: [Usuarios]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/usuario2'
*       responses:
*           200:
*               description: Usuario editado
*           401:
*               description: El usuario digito esta registrado
*/
router.put('/', (req, res) => {
    const {id,username,password,email,direccion,telefono,isAdmin} = req.body;

    const editarUsuario = obtenerUsuarios().findIndex(u => u.id === id)

     if( editarUsuario > 0){
       
        for(let i=0;i<obtenerUsuarios().length;i++){
            if(obtenerUsuarios()[i].id == id){
                obtenerUsuarios().splice(i,1);
                let usuarioActualizado = {
                    id: id,
                    username: username,
                    password: password,
                    email: email,
                    direccion: direccion,
                    telefono: telefono,
                    isAdmin: isAdmin
                }
                obtenerUsuarios().push(usuarioActualizado);
                res.json(usuarioActualizado);
                
            }
        }
    }
    else{

        
        res.json("El Usuarios no existe");
      
        
    } 
    
});


/**
 * @swagger
 * /usuarios/{id}:
 *  delete:
 *      summary: Eliminar un usuario de base de datos
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario3'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          401:
 *              description: usuario y contrasena incorrectos
 */
router.delete('/:id', (req, res) => {
    const { id } = req.body;
    const eliminaUsuario = obtenerUsuarios().findIndex(u => u.id === id);
    if(eliminaUsuario >=0){ 
        eliminarUsuarios(eliminaUsuario);
        res.json('Usuario Eliminado');
        
        
    }
    else res.status(404).json('Usuario no fue identificado');

});


/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description:  Usuarios
 * components:
 *  schemas:
 *      usuario:
 *          type: object
 *          required: 
 *              -id
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
 *                  description: Indica si el usuario es administrador o no
 *              direccion:
 *                  type: string
 *                  description: Dirección del domicilio del usuario
 *              idPedidoUser:
 *                  type: integer
 *                  description: Id que conecta los pedidos con el usuario  
 *          example:
 *              username: Dran
 *              password: sosmosdran
 *              email: drandigital@gmail.com
 *              telefono: 3156770183
 *              direccion: Cartagena
 *              isAdmin: true
 *      usuario2:  
 *          type: object
 *          required: 
 *              -id
 *              -username
 *              -password
 *              -email
 *              -telefono
 *              -direccion
 *          example:
 *              id: 3
 *              username: Dran
 *              password: sosmosdran
 *              email: drandigital@gmail.com
 *              telefono: 3156770183
 *              direccion: Cartagena
 *              isAdmin: true
 *      usuario3:  
 *          type: object
 *          required: 
 *              -id
 *          example:
 *              id: 3           
 */

module.exports = router;
