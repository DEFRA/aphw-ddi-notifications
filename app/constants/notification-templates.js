const { notify } = require('../config')
const { GENERIC_ERROR } = require('./notification-types')

const templates = {}

templates[GENERIC_ERROR] = notify.templates.genericError

module.exports = templates
