const express = require('express');
const router = express();
const _ = require('lodash');
const autenticarAdministrador = require('../middlewares/probarAdmin.middlewares');

const { obtenerUsuarios } = require('../models/usuario.model');
const { obtenerPedidosUsuario, agregarProducto, editarCantProducto, agregarPedido, eliminarProductoPedido, obtenerProductosPedido, obtenerPedidos, cambiarEstadoPedido } = require('../models/pedido.model');
const { obtenerProducto } = require('../models/producto.model');
const { obtenerMedioPago } = require('../models/medioPago.model')
router.use(express.json());

/** 
 * @swagger
 * /pedidos:
 *   post:
 *       summary: Crea un nuevo pedido a un usuario del sistema
 *       tags: [Pedidos]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/agregarPedido'
 *       responses:
 *           200:
 *               description: Pedido creado exitosamente
 *           400:
 *               description: Error al digitar los datos
 *  
 */

router.post('/', (req,res) => {
    const { username, pedido, MedioPago } = req.body;
    const user = obtenerUsuarios().find(u => u.username === username);
    const products = pedido;
    let contador = 0; 
    let aux = 0;
    
    
    products.forEach((product) => {
        obtenerProducto().forEach((producto) => {
            if(product.nombre === producto.Name) contador += 1;
        });
    });
    
    obtenerMedioPago().forEach( medio => {
        if(medio.medio === MedioPago)  aux += 1;
    });

    if(contador === 0) res.status(400).json(`Al menos 1 producto de los ingresados no existe en el restaurante`); 
    else{
        if(aux !== 0){
            if(!user) return res.status(400).json(`No existe el usuario`);
            else{
                let resultado = false;
                let idPedido = 0;
                let cont = 0;
                do{
                    idPedido = obtenerPedidosUsuario(user.id).length + 1 + cont; 
                    let verPedido = obtenerPedidos().find(u => u.idUsuario === user.id && u.idPedido === idPedido );
                    resultado = verPedido === undefined ? true : false;
                    if(resultado === false) cont += 1;
                }
                while(resultado === false);
                
                agregarPedido( user.id, idPedido, pedido, user.direccion, MedioPago);
                res.json(`Pedido creado exitosamente al usuario: ${user.username}`);
            }
        }else res.status(400).json(`Este medio de Pago: ${MedioPago} no existe en la base de datos`);
    }
});


/**   
 * @swagger
 * /pedidos/{username}/{password}:
 *   get:
 *       summary: Retorna el historial de pedidos del usuario enviado por parametros
 *       tags: [Pedidos]
 *       parameters:
 *         - name: username
 *           in: path
 *           required: true
 *           description: Nombre del usuario
 *           schema:
 *               type: string     
 *         - name: password
 *           in: path
 *           required: true
 *           description: Contraseña del usuario
 *           schema:
 *               type: string
 *       responses:
 *           200:
 *               description: Historial de pedidos del usuario
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: array
 *                           items:
 *                               $ref: '#/components/schemas/Pedido'
 *           400:
 *               description: Usuario o Contraseña incorrectos       
 * 
 */

router.get('/:username/:password', (req,res) => {
    const {username, password } = req.params; 
    const user = obtenerUsuarios().find(u => u.username === username && u.password === password);
    if(user) return res.json(obtenerPedidosUsuario(user.id));
    else res.status(404).json(`Index del usuario no encontrado, usuario: ${username} o contraseña: ${password} incorrectos`);
});

/** 
 * @swagger
 * /pedidos/borrarproducto:
 *   delete:
 *       summary: Borra un producto a un pedido de un usuario del sistema
 *       tags: [Pedidos]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/eliminarProducto'
 *       responses:
 *           200:
 *               description: Producto eliminado exitosamente
 *           400:
 *               description: Error al digitar los datos
 *  
 */
router.delete('/borrarproducto', (req, res) => {
    const { idPedido, nombre } = req.body;
    const { user, password} = req.auth;
    const usuario = obtenerUsuarios().find(u => u.username === user && u.password === password);
    const indexPedido = obtenerPedidos().findIndex(u => u.idUsuario === usuario.id && u.idPedido === idPedido);
    if(indexPedido >= 0){
        const products = obtenerProductosPedido(indexPedido);
        const indexProducto = products.findIndex(u => u.nombre === nombre);
        const estadoPedido = obtenerPedidos().find(u => u.idUsuario === usuario.id && u.idPedido === idPedido).estado;
        if(estadoPedido === "Pendiente"){
            if(indexProducto >= 0){
                eliminarProductoPedido(indexPedido, indexProducto);
                res.json('Producto Eliminado');
            }else res.status(404).json(`No se pudo eliminar el producto porque el usuario ${usuario.username}, en el pedido numero ${idPedido} no tiene un producto llamado: ${nombre}`);
        }else res.status(400).json(`No se pudo eliminar el producto porque ya se encuentra cerrado, estado actual:  ${estadoPedido} `);
    }else res.status(404).json(` El usuario ${usuario.username} no tiene un pedido con este id: ${idPedido}`);
});

/** 
 * @swagger
 * /pedidos/editarCantidad:
 *   put:
 *       summary: Editar la cantidad de un producto de un usuario del sistema
 *       tags: [Pedidos]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/editarCantidad'
 *       responses:
 *           200:
 *               description: Producto agregado exitosamente
 *           400:
 *               description: Error al digitar los datos
 *  
 */
router.put('/editarCantidad', (req, res) => {
    const { idPedido, nombreProducto, cantidad } = req.body;
    const { user, password} = req.auth;
    const usuario = obtenerUsuarios().find(u => u.username === user && u.password === password);
    const indexPedido = obtenerPedidos().findIndex(u => u.idUsuario === usuario.id && u.idPedido === idPedido);
   
    if(indexPedido >= 0){
        const products = obtenerProductosPedido(indexPedido);
        const indexProducto = products.findIndex(u => u.nombre === nombreProducto);
        if(indexProducto >= 0){
            const pedidoUser = obtenerPedidos().find(u => u.idUsuario === usuario.id && u.idPedido === idPedido);
            const estadoPedido = pedidoUser.estado;
            if(estadoPedido === "Pendiente"){
                editarCantProducto(indexPedido, indexProducto, cantidad);
                res.json('Cambios realizados satisfactoriamente');
            }else res.json(`Este pedido no se puede editar porque ya se encuentra cerrado, el estado actual es: ${estadoPedido}`);
        }else res.status(404).json(`No se pudo actualizar el producto porque el usuario ${usuario.username}, en el pedido numero ${idPedido} no tiene un producto llamado: ${nombreProducto}`);      
    }else res.status(404).json(` El usuario ${usuario.username} no tiene un pedido con este id: ${idPedido}`);
});

/** 
 * @swagger
 * /pedidos/agregarProducto:
 *   post:
 *       summary: Agrega un nuevo producto a un pedido de un usuario del sistema
 *       tags: [Pedidos]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/editarCantidad'
 *       responses:
 *           200:
 *               description: Producto agregado exitosamente
 *           400:
 *               description: Error al digitar los datos
 *  
 */
router.post('/agregarProducto', (req, res) => {
    const { idPedido, nombreProducto, cantidad} = req.body;
    const { user, password} = req.auth;
    if(obtenerProducto().find(u => u.Name === nombreProducto)){
        const producto = {nombre: nombreProducto, cantidad: cantidad};
        const usuario = obtenerUsuarios().find(u => u.username === user && u.password === password);
        const indexPedido = obtenerPedidos().findIndex(u => u.idUsuario === usuario.id && u.idPedido === idPedido);
        if(indexPedido >= 0){
            const pedidoUser = obtenerPedidos().find(u => u.idUsuario === usuario.id && u.idPedido === idPedido);
            const estadoPedido = pedidoUser.estado;
            if(estadoPedido === "Pendiente"){
                agregarProducto(indexPedido, producto);
                res.json('Producto agregado satisfactoriamente');
            } else res.json(`Este pedido no se puede editar porque ya se encuentra cerrado, el estado actual es: ${estadoPedido}`);
        }else res.status(404).json(` El usuario ${usuario.username} no tiene un pedido con este id: ${idPedido}`);
    }else res.status(404).json(` El producto ${nombreProducto} no existe en la lista de productos`);
    
});

/** 
 * @swagger
 * /pedidos/cerrarPedido:
 *   put:
 *       summary: Cierra un pedido del sistema
 *       tags: [Pedidos]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/cerrarPedido'
 *       responses:
 *           200:
 *               description: Pedido cerrado exitosamente
 *           400:
 *               description: Error al digitar los datos
 *  
 */
router.put('/cerrarPedido', (req, res) => {
    const {idPedido} = req.body;
    const userName = req.auth.user;
    const user = obtenerUsuarios().find(u => u.username === userName);
    if(user !== undefined){
        const pedidoUser = obtenerPedidos().find(u => u.idUsuario === user.id && u.idPedido === idPedido); 
        if(pedidoUser){
            if(pedidoUser.estado !== "Pendiente") res.status(400).json(`No se pudo cerrar el pedido porque este ya se encuentra cerrado, el estado actual es: ${pedidoUser.estado}`);
            else {
                cambiarEstadoPedido("Confirmado", idPedido);
                res.json('Pedido cerrado exitosamente');
            }
        }else res.status(400).json(`El usuario ${userName} no tiene un pedido con el id: ${idPedido}`); 
    } else res.status(400).json(`El usuario ${userName} no existe`);
});

/**
 * @swagger
 * /pedidos/admin:
 *  get:
 *      summary: Obtener todos los pedidos del sistema
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: Lista de Pedidos del sistema organizados por usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Pedido'
 */
router.get('/admin', autenticarAdministrador, (req,res) => { 
    res.json(_.groupBy(obtenerPedidos(), 'idUsuario'));    
});


/** 
 * @swagger
 * /pedidos/admin:
 *   put:
 *       summary: Edita el estado de un pedido del sistema
 *       tags: [Pedidos]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/editarEstado'
 *       responses:
 *           200:
 *               description: Pedido editado exitosamente
 *           400:
 *               description: Error al digitar los datos
 *  
 */
router.put('/admin', autenticarAdministrador, (req,res) => {
    const {username, idPedido, estado} = req.body;
    const user = obtenerUsuarios().find(u => u.username === username);
    if(user){
        const pedidosUser = obtenerPedidosUsuario(user.id); 
        if(pedidosUser !== undefined){
            if(estado === "Pendiente" || estado === "Confirmado" || estado === "En Preparación" || estado === "Enviado" || estado === "Entregado"){
                if(pedidosUser === "El usuario no tiene pedidos") res.status(404).json("El usuario no tiene pedidos a los cuales editar el estado");
                else{
                    const indexPedido = pedidosUser.findIndex(u => u.idPedido === idPedido);
                    if(indexPedido >= 0){
                        cambiarEstadoPedido(estado, idPedido);
                        res.json('Pedido editado exitosamente');
                    }
                    else res.status(404).json(`El usuario  no tiene algun pedido con este id: ${idPedido}`); 
                }
            }else res.status(400).json('Error, el estado debe ser alguno de los siguientes: Pendiente, Confirmado, En Preparación, Enviado, Entregado ');
        }else res.status(404).json(`No existe el usuario ${username}`);    
    }else res.status(400).json(`El usuario ${username} no existe`);
});

/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Sección de pedidos de los usuarios
 * components:
 *  schemas:
 *      Pedido:
 *          type: object
 *          required:
 *              -pedido 
 *              -MedioPago 
 *          properties:
 *              idUsuario:
 *                  type: integer
 *                  description: Id de general que identifica a todos los pedidos del usuario
 *              idPedido:
 *                  type: integer
 *                  description: Id del pedido actual del usuario
 *              estado:
 *                  type: string
 *                  description: Estado del pedido
 *              direccion:
 *                  type: string
 *                  description: Domicilio al cual se enviará el pedido
 *              medioPago:
 *                  type: string
 *                  description: Forma en la que el usuario paga el pedido realizado
 *              pedido:
 *                  type: array
 *                  description: Array de productos que se agregaran al pedido
 *          example:
 *              idUsuario: 1
 *              idPedido: 4
 *              estado: Entregado
 *              direccion: Cartagena
 *              medioPago: Efectivo
 *              pedido: [{ "nombre": "Hamburguesa Doble", "cantidad": 1}]
 *      agregarPedido:
 *          type: object
 *          required:
 *              -username
 *              -pedido 
 *              -MedioPago
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre del usuario
 *              pedido:
 *                  type: array
 *                  description: Array de productos que se agregaran al pedido
 *              MedioPago:
 *                  type: string
 *                  description: Medio de pago con el cual se cancelara el pedido
 *          example:
 *              username: Natan
 *              pedido: [{ "nombre": "Hamburguesa Doble", "cantidad": 1}]
 *              MedioPago: Efectivo
 *      eliminarProducto:
 *          type: object
 *          required: 
 *              -idPedido 
 *              -nombre       
 *          properties:                 
 *              idPedido:
 *                  type: integer
 *                  description: Id del pedido actual del usuario            
 *              nombre:
 *                  type: string
 *                  description: Nombre del producto a eliminar   
 *          example:
 *              idPedido: 0
 *              nombre: Lomo
 *      editarCantidad:
 *          type: object
 *          required: 
 *              -idPedido 
 *              -nombreProducto
 *              -cantidad       
 *          properties:                 
 *              idPedido:
 *                  type: integer
 *                  description: Id del pedido actual del usuario            
 *              nombreProducto:
 *                  type: string
 *                  description: Nombre del producto a eliminar                    
 *              cantidad:
 *                  type: integer
 *                  description: La cantidad del producto
 *          example:
 *              idPedido: 0
 *              nombreProducto: Lomo
 *              cantidad: 4
 *      cerrarPedido:
 *          type: object
 *          required:
 *              -idPedido
 *          properties:
 *              idPedido:
 *                  type: number
 *                  description: Id del pedido actual del usuario 
 *          example:
 *              idPedido: 3                
 *      editarEstado:
 *          type: object
 *          required: 
 *              -username
 *              -idPedido 
 *              -estado       
 *          properties:                 
 *              username:
 *                  type: string
 *                  description: Nombre del usuario                    
 *              idPedido:
 *                  type: integer
 *                  description: Id del pedido actual del usuario            
 *              estado:
 *                  type: string
 *                  description: Nuevo estado del pedido
 *          example:
 *              username: Natan
 *              idPedido: 0
 *              estado: Enviado                
 */


module.exports = router;

