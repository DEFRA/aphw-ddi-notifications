const { VALIDATION } = require('../../../constants/errors')
const { processNotification } = require('./process-notification')
const { validate } = require('./schemas/notification-schema')

const processNotificationMessage = async (message, receiver) => {
  try {
    const event = message.body
    validate(event)
    await processNotification(event)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process notification message:', err.message)

    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = {
  processNotificationMessage
}
