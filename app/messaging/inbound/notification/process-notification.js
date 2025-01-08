const templates = require('../../../constants/notification-templates')
const { notify } = require('../../../config')
const { getNotificationType } = require('./get-notification-type')
const { validate } = require('./schemas/notification-data-schema')
const { NotifyClient } = require('notifications-node-client')
const { getAttachmentFile } = require('../../../storage/attachments')

const client = new NotifyClient(notify.apiKey)

const processNotification = async notification => {
  try {
    const data = notification.data

    validate(data)

    const type = getNotificationType(notification.type)

    const customFields = data.personalisation?.personalisation

    if (customFields?.file_key_to_attach) {
      const filename = customFields[customFields.file_key_to_attach]
      const fileContents = await getAttachmentFile(filename)

      const options = { confirmEmailBeforeDownload: false }
      if (customFields.filename_for_display) {
        options.filename = customFields.filename_for_display
      }

      customFields[customFields.file_key_to_attach] = client.prepareUpload(fileContents, options)
      delete customFields.file_key_to_attach

      await client.sendEmail(templates[type],
        data.emailAddress,
        { personalisation: customFields }
      )
    } else {
      await client.sendEmail(templates[type],
        data.emailAddress,
        data.personalisation
      )
    }
  } catch (err) {
    // console.error('Unable to process notification:', err)
    console.error('Unable to process notification:', err.response?.data?.errors)

    throw err
  }
}

module.exports = {
  processNotification
}
