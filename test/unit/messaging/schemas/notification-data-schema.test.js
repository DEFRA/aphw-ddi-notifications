const { validate } = require('../../../../app/messaging/inbound/notification/schemas/notification-data-schema')

const validMessage = {
  personalisation: {
    personalisation: {
      body_message: 'Some text for the email'
    }
  },
  emailAddress: 'some.person@defra.gov.uk'
}

const invalidMessage = {
  personalisationX: {
    personalisation: {
      body_message: 'Some text for the email'
    }
  },
  emailAddress: 'some.person@defra.gov.uk'
}

describe('NotificationDataSchema', () => {
  test('should not throw when message is valid', () => {
    expect(() => validate(validMessage)).not.toThrow()
  })

  test('should throw when message is invalid', () => {
    expect(() => validate(invalidMessage)).toThrow('invalid')
  })
})
