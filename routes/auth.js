/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { createUser, loginUser, renewToken } = require('../controllers')
const { validateFields,validateJWT } = require('../middlewares')
const router = Router()

// api/auth
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
)
router.post(
    '/register',
    [
        check('name', 'El nombres es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    createUser
)
router.get('/renew', validateJWT, renewToken)


module.exports = router