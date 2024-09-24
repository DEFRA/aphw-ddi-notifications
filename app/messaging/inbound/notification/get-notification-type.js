const { GENERIC_ERROR, VERIFY_EMAIL } = require('../../../constants/notification-types')

const getNotificationType = type => {
  if (type.endsWith(GENERIC_ERROR)) { return GENERIC_ERROR }
  if (type.endsWith(VERIFY_EMAIL)) { return VERIFY_EMAIL }

  throw new Error(`Unknown notification type: ${type}`)
}

module.exports = {
  getNotificationType
}
