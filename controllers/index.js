const { createUser, loginUser, renewToken } = require("./auth");
const { createEvent, deleteEvent, getEvents, updateEvent } = require("./events");

module.exports = {
    createEvent,
    createUser,
    deleteEvent,
    getEvents,
    loginUser,
    renewToken,
    updateEvent
}