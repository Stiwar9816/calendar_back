const bcrypt = require('bcryptjs')
const User = require("../models")
const { generateJWT } = require("../helpers")

const createUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // Find user for email
        let user = await User.findOne({ email })

        // Error message
        if (user) return res.status(400).json({
            ok: false,
            msg: `Ya existe un usuario con el email: ${email}`
        })

        user = new User(req.body)
        // Password encrypt
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        // User Save
        await user.save()

        // Generate JWT
        const token = await generateJWT(user.id, user.name)

        // Success message
        res.status(201).json({
            ok: true,
            msg: `Registro existoso!`,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `${error.errorResponse?.errmsg}`
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // Find user for email
        const user = await User.findOne({ email })

        // Error message
        if (!user) return res.status(404).json({
            ok: false,
            msg: `El usuario con el email '${email}' no existe!`
        })

        // Confirm password
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) return res.status(400).json({
            ok: false,
            msg: 'Password incorrecto'
        })

        // Generate JWT
        const token = await generateJWT(user.id, user.name)

        // Login
        res.status(201).json({
            ok: true,
            msg: 'Login success',
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `${error.errorResponse?.errmsg}`
        })
    }
}

const renewToken = async (req, res) => {
    const { uid, name } = req

    // Generate JWT
    const token = await generateJWT(uid, name)

    res.status(201).json({
        ok: true,
        msg: 'Renew Token',
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}