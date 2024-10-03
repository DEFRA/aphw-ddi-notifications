const { notify } = require('../config')
const { GENERIC_ERROR, VERIFY_EMAIL, USER_FEEDBACK } = require('./notification-types')

const templates = {}

templates[GENERIC_ERROR] = notify.templates.genericError
templates[VERIFY_EMAIL] = notify.templates.verifyEmail
templates[USER_FEEDBACK] = notify.templates.userFeedback

module.exports = templates
