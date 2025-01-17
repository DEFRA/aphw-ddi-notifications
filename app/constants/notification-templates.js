const { notify } = require('../config')
const { GENERIC_ERROR, VERIFY_EMAIL, USER_FEEDBACK, USER_INVITE, REPORT_SOMETHING, FORM2_SUBMISSION_TO_DEFRA, FORM2_CONFIRMATION_TO_POLICE, EMAIL_APPLICATION_PACK } = require('./notification-types')

const templates = {}

templates[GENERIC_ERROR] = notify.templates.genericError
templates[VERIFY_EMAIL] = notify.templates.verifyEmail
templates[USER_FEEDBACK] = notify.templates.userFeedback
templates[USER_INVITE] = notify.templates.userInvite
templates[REPORT_SOMETHING] = notify.templates.reportSomething
templates[FORM2_SUBMISSION_TO_DEFRA] = notify.templates.form2SubmissionToDefra
templates[FORM2_CONFIRMATION_TO_POLICE] = notify.templates.form2ConfirmationToPolice
templates[EMAIL_APPLICATION_PACK] = notify.templates.emailApplicationPack

module.exports = templates
