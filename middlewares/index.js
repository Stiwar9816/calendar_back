const { validateFields } = require("./fieldsValidators");
const { validateJWT } = require("./validateToken");

module.exports = {
    validateFields,
    validateJWT
}