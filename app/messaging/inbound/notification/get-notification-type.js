const { REGISTER_CONFIRMATION } = require('../../../constants/notification-types')

const getNotificationType = type => {
  if (type.endsWith(REGISTER_CONFIRMATION))
    return REGISTER_CONFIRMATION

  throw new Error(`Unknown notification type: ${type}`)
}

module.exports = {
  getNotificationType
}
