const express = require('express');
const { crearReservacion, obtenerReservacionesPorHotel, obtenerDetallesReservacion } = require('../controllers/reservation.controllers');
const router = express.Router();

router.post('/crear', crearReservacion);
router.get('/listar', obtenerReservacionesPorHotel);
router.get('/:idReserva', obtenerDetallesReservacion);

module.exports = router;


/**
 * @swagger
 * definitions:
 *   Reserva:
 *     type: object
 *     required:
 *       - fechaEntrada
 *       - fechaSalida
 *       - cantidadPersonas
 *       - ciudadDestino
 *       - hotel
 *       - habitacion
 *     properties:
 *       fechaEntrada:
 *         type: string
 *         format: date-time
 *         example: "2023-10-01T00:00:00Z"
 *       fechaSalida:
 *         type: string
 *         format: date-time
 *         example: "2023-10-05T00:00:00Z"
 *       cantidadPersonas:
 *         type: integer
 *         example: 2
 *       ciudadDestino:
 *         type: string
 *         example: "Cancún"
 *       hotel:
 *         type: string
 *         description: ID del hotel
 *       habitacion:
 *         type: string
 *         description: ID de la habitación
 *       huéspedes:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             nombres:
 *               type: string
 *             apellidos:
 *               type: string
 *             fechaNacimiento:
 *               type: string
 *               format: date-time
 *             género:
 *               type: string
 *             tipoDocumento:
 *               type: string
 *             numeroDocumento:
 *               type: string
 *             email:
 *               type: string
 *             telefono:
 *               type: string
 *       contactoEmergencia:
 *         type: object
 *         properties:
 *           nombresCompletos:
 *             type: string
 *           telefono:
 *             type: string
 */

/**
 * @swagger
 * /reservas/listar:
 *   get:
 *     tags:
 *       - Reservas
 *     description: Lista todas las reservaciones de un hotel específico
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: hotelId
 *         description: ID del hotel para listar sus reservaciones
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Lista de reservaciones del hotel
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Reserva'
 *       404:
 *         description: Hotel no encontrado
 */

/**
 * @swagger
 * /reservas/{idReserva}:
 *   get:
 *     tags:
 *       - Reservas
 *     description: Obtiene los detalles de una reservación específica
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idReserva
 *         description: ID de la reservación
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Detalles de la reservación
 *         schema:
 *           $ref: '#/definitions/Reserva'
 *       404:
 *         description: Reservación no encontrada
 */
