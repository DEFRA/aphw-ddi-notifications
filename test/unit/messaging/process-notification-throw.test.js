const mockSendEmail = jest.fn().mockImplementation(() => { throw new Error('error sending') })

jest.mock('notifications-node-client', () => {
  const MockNotifyClient = jest.fn().mockImplementation(() => ({
    sendEmail: mockSendEmail
  }))

  return {
    NotifyClient: MockNotifyClient
  }
})

const { processNotification } = require('../../../app/messaging/inbound/notification/process-notification')

const validMessage = {
  id: 'b68da60f-6638-4acd-93e6-77f34b0b4ead',
  time: '2024-07-24T16:39:00.000Z',
  specversion: '1.0',
  type: 'generic-error',
  source: 'aphw-ddi-portal',
  data: {
    personalisation: {
      personalisation: {
        body_message: 'Some text for the email'
      }
    },
    emailAddress: 'some.person@defra.gov.uk'
  }
}

describe('ProcessNotification', () => {
  test('should throw if exception occurs', async () => {
    await expect(processNotification(validMessage)).rejects.toThrow('error sending')
  })
})
