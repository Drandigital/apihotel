const express = require('express');
const { crearHabitacion, modificarHabitacion, alternarEstadoHabitacion, obtenerHabitacionesPorHotel } = require('../controllers/room.controllers');
const router = express.Router();

router.post('/crear', crearHabitacion);
router.put('/modificar/:idHabitacion', modificarHabitacion);
router.put('/alternar-estado/:idHabitacion', alternarEstadoHabitacion);
router.get('/hotel/:idHotel', obtenerHabitacionesPorHotel);

module.exports = router;

/**
 * @swagger
 * definitions:
 *   Habitacion:
 *     type: object
 *     required:
 *       - numero
 *       - descripcion
 *       - costoBase
 *       - impuestos
 *       - tipoHabitacion
 *       - ubicacion
 *       - hotel
 *     properties:
 *       numero:
 *         type: integer
 *         example: 101
 *       descripcion:
 *         type: string
 *         example: "Habitación con vista al mar"
 *       costoBase:
 *         type: number
 *         example: 150.00
 *       impuestos:
 *         type: number
 *         example: 15.00
 *       tipoHabitacion:
 *         type: string
 *         enum: [simple, doble, suite]
 *         example: doble
 *       ubicacion:
 *         type: string
 *         example: "Segundo piso"
 *       estado:
 *         type: boolean
 *         example: true
 *       hotel:
 *         type: string
 *         description: ID del hotel
 *         example: "5e56f7b20f1a4b6785b6b0b1"
 */

/**
 * @swagger
 * /habitaciones/modificar/{idHabitacion}:
 *   put:
 *     tags:
 *       - Habitaciones
 *     description: Modifica una habitación existente
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idHabitacion
 *         description: ID de la habitación a modificar
 *         in: path
 *         required: true
 *         type: string
 *       - name: habitacion
 *         description: Datos de la habitación modificada
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Habitacion'
 *     responses:
 *       200:
 *         description: Habitación modificada exitosamente
 *       400:
 *         description: Error al modificar la habitación
 */

/**
 * @swagger
 * /habitaciones/alternar-estado/{idHabitacion}:
 *   put:
 *     tags:
 *       - Habitaciones
 *     description: Alterna el estado de disponibilidad de una habitación
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idHabitacion
 *         description: ID de la habitación cuyo estado se desea alternar
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Estado de la habitación alterado exitosamente
 *       400:
 *         description: Error al alternar el estado de la habitación
 */

/**
 * @swagger
 * /habitaciones/hotel/{idHotel}:
 *   get:
 *     tags:
 *       - Habitaciones
 *     description: Obtiene todas las habitaciones de un hotel específico
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idHotel
 *         description: ID del hotel para listar sus habitaciones
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de habitaciones del hotel
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Habitacion'
 *       404:
 *         description: Hotel no encontrado
 */
