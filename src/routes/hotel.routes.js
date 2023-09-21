const express = require('express');
const { crearHotel, modificarHotel, alternarEstadoHotel, obtenerHotel } = require('../controllers/hotel.controllers');
const router = express.Router();

router.post('/crear', crearHotel);
router.put('/modificar/:idHotel', modificarHotel);
router.put('/alternar-estado/:idHotel', alternarEstadoHotel);
router.get('/:idHotel', obtenerHotel);

module.exports = router;

/**
 * @swagger
 * definitions:
 *   Hotel:
 *     type: object
 *     required:
 *       - nombre
 *       - ubicacion
 *     properties:
 *       nombre:
 *         type: string
 *         example: "Hotel Paradiso"
 *       ubicacion:
 *         type: string
 *         example: "123 Calle Principal, Ciudad, País"
 *       estado:
 *         type: boolean
 *         example: true
 *       habitaciones:
 *         type: array
 *         items:
 *           type: string
 *           format: objectId
 *         example: ["5e56f7b20f1a4b6785b6b0b1", "5e56f7b20f1a4b6785b6b0b2"]
 */

/**
 * @swagger
 * /hoteles/crear:
 *   post:
 *     tags:
 *       - Hoteles
 *     description: Crea un nuevo hotel
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hotel
 *         description: Datos del hotel a crear
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *     responses:
 *       201:
 *         description: Hotel creado exitosamente
 *       400:
 *         description: Error al crear el hotel
 */

/**
 * @swagger
 * /hoteles/modificar/{idHotel}:
 *   put:
 *     tags:
 *       - Hoteles
 *     description: Modifica un hotel existente
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idHotel
 *         description: ID del hotel a modificar
 *         in: path
 *         required: true
 *         type: string
 *       - name: hotel
 *         description: Datos del hotel modificado
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *     responses:
 *       200:
 *         description: Hotel modificado exitosamente
 *       400:
 *         description: Error al modificar el hotel
 */

/**
 * @swagger
 * /hoteles/alternar-estado/{idHotel}:
 *   put:
 *     tags:
 *       - Hoteles
 *     description: Alterna el estado de un hotel
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idHotel
 *         description: ID del hotel cuyo estado se desea alternar
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Estado del hotel alterado exitosamente
 *       400:
 *         description: Error al alternar el estado del hotel
 */

/**
 * @swagger
 * /hoteles/{idHotel}:
 *   get:
 *     tags:
 *       - Hoteles
 *     description: Obtiene detalles de un hotel específico
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idHotel
 *         description: ID del hotel que se desea consultar
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Detalles del hotel
 *         schema:
 *           $ref: '#/definitions/Hotel'
 *       404:
 *         description: Hotel no encontrado
 */
