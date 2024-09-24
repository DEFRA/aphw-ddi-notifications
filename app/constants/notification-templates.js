const { notify } = require('../config')
const { GENERIC_ERROR, VERIFY_EMAIL } = require('./notification-types')

const templates = {}

templates[GENERIC_ERROR] = notify.templates.genericError
templates[VERIFY_EMAIL] = notify.templates.verifyEmail

module.exports = templates
