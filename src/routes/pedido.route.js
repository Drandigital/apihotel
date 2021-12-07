const express = require('express');
const router = express.Router();
const {obtenerUsuarios} = require('../models/usuario.model');
const {obtenerProducto} = require('../models/producto.model');
const {pruductoNuevoPedido,obtenerPedidosUsuario, agregarPedido, obtenerPedidos,} = require('../models/pedido.model');
const {obtenerMedioPago} = require('../models/medioPago.model')

// Obtener todos los productos para meter en pedidos


router.get('/productos',(req,res) => {
    res.status(200).json(obtenerProducto())
});

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

// Agregar Pedido
router.post('/', (req,res) => {
    const { username, pedidos, nombreMedioPago } = req.body;
    const user = obtenerUsuarios().find(u => u.username === username);
    const products = pedidos;
    let contador = 0; 
    let aux = 0;
    
    
    products.forEach((product) => {
        obtenerProductos().forEach((producto) => {
            if(product.nombre === producto.nombre) contador += 1;
        });
    });
    
    obtenerMediosPago().forEach( medio => {
        if(medio.nombre === nombreMedioPago)  aux += 1;
    });

    if(contador === 0) res.status(400).json(`Al menos 1 producto de los ingresados no existe en el restaurante`); 
    else{
        if(aux !== 0){
            if(!user) return res.status(400).json(`No existe el usuario ${usuario}`);
            else{
                let resultado = false;
                let idPedido = 0;
                let cont = 0;
                do{
                    idPedido = obtenerPedidosUsuario(user.idPedidoUser).length + 1 + cont; 
                    let verPedido = obtenerPedidos().find(u => u.idPedidosUsuario === user.idPedidoUser && u.idPedido === idPedido );
                    resultado = verPedido === undefined ? true : false;
                    if(resultado === false) cont += 1;
                }
                while(resultado === false);
                
                agregarPedido( user.idPedidoUser, idPedido, pedidos, user.direccion, nombreMedioPago);
                res.json(`Pedido creado exitosamente al usuario: ${user.username}`);
            }
        }else res.status(400).json(`Este medio de Pago: ${nombreMedioPago} no existe en la base de datos`);
    }
});



/**   
 * @swagger
 * /pedidos:
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
// Ver todos los pedido

router.get('/',(req,res) => {
    res.status(200).json(obtenerPedidos())
});



//Agregar Producto nuevo en pedido de un usuario 

router.post('/usuarioProducto', (req, res) => {
    const {username, idUser, Name, pedidos} = req.body;
    if(obtenerProducto().find(u => u.Name === Name)){
        const producto = {Name: Name, pedidos: pedidos};
        const usuario = obtenerUsuarios().find(u => u.username === username);
        const idUsuarioPedido = obtenerPedidos().findIndex(u => u.idUser === idUser);
        if(idUsuarioPedido >= 0){
            const pedidoUser = obtenerPedidos().find(u => u.idUser === idUser);
            const estadoPedido = pedidoUser.estado;
            if(estadoPedido === "Pendiente"){
                pruductoNuevoPedido(idUsuarioPedido, producto);
                res.json('Producto agregado ');
            } else res.json(`Este pedido no se puede editar : ${estadoPedido}`);
        }else res.status(404).json(` El usuario ${usuario.username} no tiene un pedido con este id: ${idUser}`);
    }else res.status(404).json(` El producto ${Name} no existe en la lista de productos`);
    
});

//Agregar Producto nuevo en pedido en especifico

router.post('/pedidoProducto', (req, res) => {
    const {direccionPedido, idPedido, Name, pedidos} = req.body;
    if(obtenerProducto().find(u => u.Name === Name)){
        const producto = {Name: Name, pedidos: pedidos};
        const idUsuarioPedido = obtenerPedidos().findIndex(u => u.idPedido === idPedido);
        if(idUsuarioPedido >= 0 && obtenerPedidos().find(u => u.direccionPedido === direccionPedido)){
            const pedidoUser = obtenerPedidos().find(u => u.idPedido === idPedido);
            const estadoPedido = pedidoUser.estado;
            if(estadoPedido === "Pendiente"){
                pruductoNuevoPedido(idUsuarioPedido, producto);
                res.json('Producto agregado ');
            } else res.json(`Este pedido no se puede editar : ${estadoPedido}`);
        }else res.status(404).json(` En la direccion ${direccionPedido} no tiene un pedido con este id: ${idPedido} o esta errada`);
    }else res.status(404).json(` El producto ${Name} no existe en la lista de productos`);
    
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
 *              -carrito 
 *              -nombreMedioPago 
 *          properties:
 *              idPedidosUsuario:
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
 *              carrito:
 *                  type: array
 *                  description: Array de productos que se agregaran al pedido
 *          example:
 *              idPedidosUsuario: 1
 *              idPedido: 4
 *              estado: Entregado
 *              direccion: Torices, Carrera 14 #41-32
 *              medioPago: Cheque en Blanco
 *              carrito: [{ "nombre": "Hamburguesa Doble", "cantidad": 1}]
 *      agregarPedido:
 *          type: object
 *          required:
 *              -username
 *              -carrito 
 *              -nombreMedioPago
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre del usuario
 *              carrito:
 *                  type: array
 *                  description: Array de productos que se agregaran al pedido
 *              nombreMedioPago:
 *                  type: string
 *                  description: Medio de pago con el cual se cancelara el pedido
 *          example:
 *              username: Decstro
 *              carrito: [{ "nombre": "Hamburguesa Doble", "cantidad": 1}]
 *              nombreMedioPago: Cheque en Blanco
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
 *              idPedido: 1
 *              nombre: Lomo de Cerdo
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
 *              idPedido: 1
 *              nombreProducto: Lomo de Cerdo
 *              cantidad: 5
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
 *              username: Decstro
 *              idPedido: 0
 *              estado: Enviado                
 */


module.exports = router;