const { notify } = require('../config')
const { REGISTER_CONFIRMATION } = require('./notification-types')

const templates = {}

templates[REGISTER_CONFIRMATION] = notify.templates.registerConfirmation

module.exports = templates
