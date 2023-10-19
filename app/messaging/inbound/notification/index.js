const { messageConfig } = require('../../../config')
const { processNotificationMessage } = require('./process-notification-message')
const { MessageReceiver } = require('ffc-messaging')

let receiver

const start = async () => {
  const action = message => processNotificationMessage(message, receiver)
  receiver = new MessageReceiver(messageConfig.notificationQueue, action)
  await receiver.subscribe()

  console.info('Ready to process notifications')
}

const stop = async () => {
  await receiver.closeConnection()
}

module.exports = { start, stop }
