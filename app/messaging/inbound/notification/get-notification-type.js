const { GENERIC_ERROR, VERIFY_EMAIL, USER_FEEDBACK, USER_INVITE, REPORT_SOMETHING } = require('../../../constants/notification-types')

const getNotificationType = type => {
  if (type.endsWith(GENERIC_ERROR)) { return GENERIC_ERROR }
  if (type.endsWith(VERIFY_EMAIL)) { return VERIFY_EMAIL }
  if (type.endsWith(USER_FEEDBACK)) { return USER_FEEDBACK }
  if (type.endsWith(USER_INVITE)) { return USER_INVITE }
  if (type.endsWith(REPORT_SOMETHING)) { return REPORT_SOMETHING }

  throw new Error(`Unknown notification type: ${type}`)
}

module.exports = {
  getNotificationType
}
