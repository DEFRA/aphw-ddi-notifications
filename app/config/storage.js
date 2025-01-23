const Joi = require('joi')
const { getEnvironmentVariable } = require('../lib/environment-helpers')

// Define config schema
const schema = Joi.object({
  connectionString: Joi.string().when('useConnectionStr', { is: true, then: Joi.required(), otherwise: Joi.allow('').optional() }),
  storageAccount: Joi.string().required(),
  attachmentsContainer: Joi.string().default('attachments'),
  certificatesContainer: Joi.string().default('certificates'),
  useConnectionString: Joi.boolean().default(false),
  managedIdentityClientId: Joi.string().optional()
})

// Build config
const config = {
  connectionString: getEnvironmentVariable('AZURE_STORAGE_CONNECTION_STRING'),
  storageAccount: getEnvironmentVariable('AZURE_STORAGE_ACCOUNT_NAME'),
  attachmentsContainer: getEnvironmentVariable('AZURE_STORAGE_ATTACHMENTS_CONTAINER'),
  certificatesContainer: getEnvironmentVariable('AZURE_STORAGE_CERTIFICATES_CONTAINER'),
  useConnectionString: getEnvironmentVariable('AZURE_STORAGE_USE_CONNECTION_STRING'),
  managedIdentityClientId: getEnvironmentVariable('AZURE_CLIENT_ID')
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The blob storage config is invalid. ${result.error.message}`)
}

module.exports = result.value
