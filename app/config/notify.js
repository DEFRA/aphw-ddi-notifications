const Joi = require('joi')

const schema = Joi.object({
  notify: {
    apiKey: Joi.string().required()
  }
})

const config = {
  notify: {
    apiKey: process.env.NOTIFY_API_KEY,
    templates: {
      
    }
  }
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

module.exports = result.value
