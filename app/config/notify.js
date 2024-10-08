const Joi = require('joi')
const { getEnvironmentVariable } = require('../lib/environment-helpers')

const schema = Joi.object({
  apiKey: Joi.string().required(),
  templates: Joi.object({
    genericError: Joi.string().uuid().required(),
    verifyEmail: Joi.string().uuid().required(),
    userFeedback: Joi.string().uuid().required(),
    userInvite: Joi.string().uuid().required()
  }).required()
})

const config = {
  apiKey: getEnvironmentVariable('NOTIFY_API_KEY'),
  templates: {
    genericError: getEnvironmentVariable('GENERIC_ERROR_TEMPLATE_ID'),
    verifyEmail: getEnvironmentVariable('VERIFY_EMAIL_TEMPLATE_ID'),
    userFeedback: getEnvironmentVariable('USER_FEEDBACK_TEMPLATE_ID'),
    userInvite: getEnvironmentVariable('USER_INVITE_TEMPLATE_ID')
  }
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

module.exports = result.value
