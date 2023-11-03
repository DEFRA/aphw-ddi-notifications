const Joi = require('joi')
const { VALIDATION } = require('../../../../constants/errors')

const schema = Joi.object({
  emailAddress: Joi.string().required(),
  personalisation: Joi.object({
    personalisation: Joi.object().default({})
  }).required()
}).required()

const validate = notification => {
  const validationResult = schema.validate(notification, { abortEarly: false, allowUnknown: true })
  if (validationResult.error) {
    const error = new Error(`Notification data is invalid, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  schema,
  validate
}
