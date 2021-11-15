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

// Agregar Pedido
router.post('/', (req, res) => {
    const id = obtenerPedidos().length + 1;
    const { username, medio, direccion, pedido } = req.body;
    const usuario = obtenerUsuarios().find(u => u.username === username);
    let pedidoNuevo={};
    if(usuario && medio && direccion && pedido){
        pedidoNuevo = {id, ...req.body};
        agregarPedido(pedidoNuevo);
        res.json(pedidoNuevo);
        res.json('Pedido Cargado');
        res.sendStatus(201);
    }else res.status(404).json('el cliente no existe en base de datos o el pedido esta incompleto');

        
});

// Ver todos los pedidos

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


module.exports = router;