const express = require('express');
const router = express.Router();

const { obtenerProducto, agregarProducto, eliminarProducto } = require('../models/producto.model.js');
const { obtenerUsuarios} = require('../models/usuario.model.js')

router.get('/', (req,res) => {
    res.json(obtenerProducto());
});

// se realiza la validacion de administrador en productos.route
// para que el get de la peticiones de productos la pueda hacer un usuario no administrador.
router.use('/', (req, res, next) => {
    if(obtenerUsuarios().some(u => u.username === req.auth.user && u.isAdmin == true)){
        return next();
        
    }else{
        return res.status(403).json(' Usted No es Administrador');
    };
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
   
    const id = obtenerProducto().length+1;
    const { Name, price } = req.body;
    if(Name && price && !obtenerProducto().find(u => u.Name === Name)) {
        const productos = { id:id, Name:req.body.Name, price:req.body.price};
        agregarProducto(productos);
        res.json(productos);
    }else{
        res.status(404).json("Producto invalido o ya agregado")
    }

});

router.put('/:admin', (req,res) => {
    const { id, Name, price } = req.body;
    const editarProducto = obtenerProducto().findIndex(u => u.id === id);
    if(editarProducto >=0){
        
        obtenerProducto().forEach(producto => {
            if(producto.id === id){
                producto.Name = Name ? Name : producto.Name;
                producto.price = price ? price : producto.price;
                res.json('Producto editado')
            }
        });
    }else {
        res.status(404).json('Producto no encontrado')
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.body;
    const eliminaProducto = obtenerProducto().findIndex(u => u.id === id);
    if(eliminaProducto >=0){ 
        eliminarProducto(eliminaProducto);
        res.json('Producto Eliminado');
        
    }
    else res.status(404).json('Producto no encontrado');

});

module.exports = router;
