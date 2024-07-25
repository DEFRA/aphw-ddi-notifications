const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')
const { getEnvironmentVariable } = require('../lib/environment-helpers')

const schema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object()
  },
  notificationQueue: {
    address: Joi.string(),
    type: Joi.string()
  },
  eventsSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().default('subscription')
  }
})

const config = {
  messageQueue: {
    host: getEnvironmentVariable('MESSAGE_QUEUE_HOST'),
    username: getEnvironmentVariable('MESSAGE_QUEUE_USER'),
    password: getEnvironmentVariable('MESSAGE_QUEUE_PASSWORD'),
    useCredentialChain: getEnvironmentVariable('NODE_ENV') === PRODUCTION,
    appInsights: getEnvironmentVariable('NODE_ENV') === PRODUCTION ? require('applicationinsights') : undefined
  },
  notificationQueue: {
    address: getEnvironmentVariable('NOTIFICATIONS_QUEUE_ADDRESS'),
    type: 'queue'
  },
  eventsSubscription: {
    address: getEnvironmentVariable('EVENTS_SUBSCRIPTION_ADDRESS'),
    topic: getEnvironmentVariable('EVENTS_TOPIC_ADDRESS'),
    type: 'subscription'
  }
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The message config is invalid. ${result.error.message}`)
}

const eventsSubscription = { ...result.value.messageQueue, ...result.value.eventsSubscription }
const notificationQueue = { ...result.value.messageQueue, ...result.value.notificationQueue }

module.exports = {
  eventsSubscription,
  notificationQueue
}
