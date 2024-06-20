/*
    Event Routes
    /api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { getEventos, crearEvento, actualizarEventos, eliminarEventos } = require('../controllers/events');

const router = Router();

// todas tienen que pasar por la validación de JWT
router.use( validateJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear nuevo evento
router.post(
  '/', 
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    validateFields
  ],
  crearEvento
);


// Actualizar evento
router.put('/:id', actualizarEventos);

// Borrar evento
router.delete('/:id', eliminarEventos);

module.exports = router;