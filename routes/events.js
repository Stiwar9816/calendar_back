/* 
    Rutas de Eventos / Events
    host + /api/events
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers')
const { validateJWT, validateFields } = require('../middlewares')
const { isDate } = require('../helpers')
const router = Router()

// Use middleware on all routes
router.use(validateJWT)

// api/events
router.get('/', getEvents)

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        check('user', 'La información del creador del evento es obligatorio'),
        validateFields
    ],
    createEvent
)

router.put('/:id', updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router