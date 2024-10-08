const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
    const token = req.header('x-token')
    if (!token) return res.status(401).json({
        ok: false,
        msg: 'No existe un token valido en la petición'
    })

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_TOKEN_JWT)
        req.uid = uid
        req.name = name
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
    next()
}

module.exports = {
    validateJWT
}