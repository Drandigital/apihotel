const express = require('express');
const router = express.Router();
const {obtenerMedioPago,agregarMedioPago,eliminarMedioPago} = require('../models/medioPago.model')
const {obtenerUsuarios } = require('../models/usuario.model');


/**
 * @swagger
 * /medios:
 *  get:
 *      summary: Obtener todos los medios de pagos
 *      tags: [Medios de Pago]
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/medio2'
 */

router.use('/', (req, res, next) => {
    if(obtenerUsuarios().some(u => u.username === req.auth.user && u.isAdmin == true)){
        return next();
        
    }else{
        return res.status(404).json(' Usted No es Administrador no puede ver la lista de usuarios');
    };
});

router.get('/', (req, res) => {
    res.json(obtenerMedioPago());

});



/**
 * @swagger
 * /medios:
 *    post:
 *          summary: Agregar medio de pago
 *          tags: [Medios de Pago]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/medio'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: medio de pago agregado
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
router.post('/', (req,res) => {
    const id = obtenerMedioPago().length + 1;
    const { medio } = req.body;
let medioNuevo={};

if(medio){
           if(!obtenerMedioPago().find(u => u.medio === medio)){
        medioNuevo = {id, ...req.body};
        agregarMedioPago(medioNuevo);
        res.json(medioNuevo);
        res.json('Medio de pago Registrado');
        }else{
        res.status(404).json('El medio de pago ya esta registrado')
       }
  }else{
    res.status(404).json('ingrese correctamente el medio de pago');
  }
});

/**
 * @swagger
 * /medios:
 *    put:
 *          summary: Editar medio de pago
 *          tags: [Medios de Pago]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/medio2'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: medio de pago Editado
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
router.put('/', (req, res) => {
    const {id,medio} = req.body;

    const editarMedio = obtenerMedioPago().findIndex(u => u.id === id)

     if( editarMedio > 0){
       
        for(let i=0;i<obtenerMedioPago().length;i++){
            if(obtenerMedioPago()[i].id == id){
                obtenerMedioPago().splice(i,1);
                let medioActualizado = {
                    id: id,
                    medio: medio,
                   
                }
                obtenerMedioPago().push(medioActualizado);
                res.json(medioActualizado);
                
            }
        }
    }
    else{

        
        res.json("El Medio de pago no existe");
      
        
    } 
    
});

/**
 * @swagger
 * /medios:
 *    delete:
 *          summary: Eliminar medio de pago
 *          tags: [Medios de Pago]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/medio3'
 *                     type: 
 *                          Array             
 *          responses:
 *                  '200':
 *                      description: medio de pago Eliminado
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

router.delete('/', (req, res) => {
    const { id } = req.body;
    const eliminaMedio = obtenerMedioPago().findIndex(u => u.id === id);
    if(eliminaMedio >=0){ 
        eliminarMedioPago(eliminaMedio);
        res.json('Medio de pago Eliminado');
        
        
    }
    else res.status(404).json('Medio de pago no fue identificado');

});


/**
 * @swagger
 * tags:
 *  name: login
 *  description: Sección de registro e ingreso de Usuarios
 * components:
 *  schemas:
 *      medio:
 *          type: object
 *          required:
 *              -medio
 *          properties:
 *              medio:
 *                  type: string
 *                  description: Medio de pago 
 *             
 *          example:
 *                medio: "PSE" 
 *      medio2:
 *          type: object
 *          required:
 *              -medio 
 *          properties:
 *              medio:
 *                  type: string
 *                  description: Medio de pago 
 *          example:
 *                id: 2
 *                medio: "PSE"
 *      medio3:
 *          type: object
 *          required:
 *              -medio 
 *          properties:
 *              medio:
 *                  type: string
 *                  description: Medio de pago 
 *          example:
 *                id: 2
 *                medio: "Efectivo"  
 *   
 */

module.exports = router;