const Joi = require('joi')
const { VALIDATION } = require('../../../../constants/errors')

const schema = Joi.object({
  specversion: Joi.string().required(),
  type: Joi.string().required(),
  source: Joi.string().required(),
  id: Joi.string().uuid().required(),
  time: Joi.date().required(),
  subject: Joi.string().default('None'),
  datacontenttype: Joi.string().default('None'),
  data: Joi.any().default({})
}).required()

const validate = notification => {
  const validationResult = schema.validate(notification, { abortEarly: false, allowUnknown: true })
  if (validationResult.error) {
    const error = new Error(`Notification message is invalid, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  schema,
  validate
}
