const { GENERIC_ERROR } = require('../../../constants/notification-types')

const getNotificationType = type => {
  if (type.endsWith(GENERIC_ERROR)) { return GENERIC_ERROR }

  throw new Error(`Unknown notification type: ${type}`)
}

module.exports = {
  getNotificationType
}
