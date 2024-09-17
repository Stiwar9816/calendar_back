const Event = require("../models")

const getEvents = async (req, res) => {
    const events = await Event.find().populate('user', 'name')
    res.status(201).json({
        ok: true,
        events
    })
}

const createEvent = async (req, res) => {

    const event = new Event(req.body)

    try {
        event.user = req.uid
        const newEvent = await event.save()
        res.status(201).json({
            ok: true,
            newEvent
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `${error.errorResponse?.errmsg}`
        })
    }
}

const updateEvent = async (req, res) => {
    const eventId = req.params.id
    try {
        const event = await Event.findById(eventId)

        // Error message
        if (!event) return res.status(404).json({
            ok: false,
            msg: `El evento que quieres actualizar no existe!`
        })

        if (event.user.toString() !== req.uid) return res.status(401).json({
            ok: false,
            msg: `No tienes privilegio de editar este evento!`
        })

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const editEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.status(201).json({
            ok: true,
            eventId,
            editEvent
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `${error.errorResponse?.errmsg}`
        })
    }
}

const deleteEvent = async (req, res) => {
    const eventId = req.params.id
    try {
        const event = await Event.findById(eventId)

        // Error message
        if (!event) return res.status(404).json({
            ok: false,
            msg: `El evento que quieres eliminar no existe!`
        })

        if (event.user.toString() !== req.uid) return res.status(401).json({
            ok: false,
            msg: `No tienes privilegio de eliminar este evento!`
        })

        await Event.findByIdAndDelete(eventId)

        res.status(201).json({
            ok: true,
            msg: `Evento ${req.title} ha sido eliminado!`
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `${error.errorResponse?.errmsg}`
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}