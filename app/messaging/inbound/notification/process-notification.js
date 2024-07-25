const templates = require('../../../constants/notification-templates')
const { notify } = require('../../../config')
const { getNotificationType } = require('./get-notification-type')
const { validate } = require('./schemas/notification-data-schema')
const { NotifyClient } = require('notifications-node-client')

const client = new NotifyClient(notify.apiKey)

const processNotification = async notification => {
  try {
    const data = notification.data

    validate(data)

    const type = getNotificationType(notification.type)

    await client.sendEmail(templates[type],
      data.emailAddress,
      data.personalisation
    )
  } catch (err) {
    // console.error('Unable to process notification:', err)
    console.error('Unable to process notification:', err.response?.data?.errors)

    throw err
  }
}

module.exports = {
  processNotification
}
