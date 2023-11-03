const Joi = require('joi')

const schema = Joi.object({
  apiKey: Joi.string().required(),
  templates: Joi.object({
    registerConfirmation: Joi.string().uuid().required()
  }).required()
})

const config = {
  apiKey: process.env.NOTIFY_API_KEY,
  templates: {
    registerConfirmation: process.env.REGISTER_CONFIRMATION_TEMPLATE_ID
  }
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

module.exports = result.value
