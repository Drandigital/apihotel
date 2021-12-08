const express = require('express');
const router = express.Router();

const { obtenerProducto, agregarProducto, eliminarProducto } = require('../models/producto.model.js');
const { obtenerUsuarios} = require('../models/usuario.model.js')

/**
 * @swagger
 * /producto:
 *  get:
 *      summary: Obtener todos los Productos
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: Lista de Productos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Producto'
 */

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

/**
 * @swagger
 * /producto:
 *    post:
 *          summary: Agregar Producto
 *          tags: [Productos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/agregarProducto'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: Producto agregado
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

/**
 * @swagger
 * /producto/{admin}:
 *    put:
 *          summary: Editar Producto
 *          tags: [Productos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/editarProducto'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: Producto Editado
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


/**
 * @swagger
 * /producto/{id}:
 *    delete:
 *          summary: Eliminar Producto
 *          tags: [Productos]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/Producto'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: Producto Eliminado
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


router.delete('/:id', (req, res) => {
    const { id } = req.body;
    const eliminaProducto = obtenerProducto().findIndex(u => u.id === id);
    if(eliminaProducto >=0){ 
        eliminarProducto(eliminaProducto);
        res.json('Producto Eliminado');
        
    }
    else res.status(404).json('Producto no encontrado');

});



/**
 * @swagger
 * tags:
 *  name: login
 *  description: Sección de productos del sistema
 * components:
 *  schemas:
 *      Producto:
 *          type: object
 *          required:
 *              -id
 *              -Name 
 *          properties:             
 *              id:
 *                  type: integer
 *                  description: Id del producto
 *              Name:
 *                  type: string
 *                  description: Nombre del producto
 *          example:
 *              id: 002
 *              Name: Pizza
 *      agregarProducto: 
 *          type: object
 *          required: 
 *              -Name       
 *              -price  
 *          properties:
 *              Name:
 *                  type: string
 *                  description: Nombre del producto
 *              price : 
 *                  type: integer
 *                  description: Precio del producto
 *          example:
 *              Name: carne
 *              price : 10000
 *      editarProducto: 
 *          type: object
 *          required: 
 *              -id
 *              -Name       
 *              -price     
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Id del producto  
 *              Name:
 *                  type: string
 *                  description: Nombre del producto
 
 *              price : 
 *                  type: integer
 *                  description: Precio del producto
 *          example:
 *              id: 003
 *              Name: Hamburguesa Doble
 *              price : 50000
 * 
 * 
 * 
 */



module.exports = router;
