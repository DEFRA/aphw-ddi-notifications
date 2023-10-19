const { notify } = require('../../../config')
const { validate } = require('./schemas/notification-data-schema')
const { NotifyClient } = require('notifications-node-client')

const client = new NotifyClient(notify.notify.apiKey)

const processNotification = async notification => {
  try {
    validate(notification.data)
    await client.sendEmail(notification.data.templateId, notification.data.emailAddress, notification.data.personalisation)
  } catch (err) {
    console.error('Unable to process notification:', err)

    throw err
  }
}

module.exports = {
  processNotification
}
