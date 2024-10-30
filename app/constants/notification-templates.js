const { notify } = require('../config')
const { GENERIC_ERROR, VERIFY_EMAIL, USER_FEEDBACK, USER_INVITE, REPORT_SOMETHING } = require('./notification-types')

const templates = {}

templates[GENERIC_ERROR] = notify.templates.genericError
templates[VERIFY_EMAIL] = notify.templates.verifyEmail
templates[USER_FEEDBACK] = notify.templates.userFeedback
templates[USER_INVITE] = notify.templates.userInvite
templates[REPORT_SOMETHING] = notify.templates.reportSomething

module.exports = templates
