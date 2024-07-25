const mockSendEmail = jest.fn()

const { processNotification } = require('../../../app/messaging/inbound/notification/process-notification')

jest.mock('notifications-node-client', () => {
  const MockNotifyClient = jest.fn().mockImplementation(() => ({
    sendEmail: mockSendEmail
  }))

  return {
    NotifyClient: MockNotifyClient
  }
})

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
  test('should process valid message', async () => {
    await processNotification(validMessage)
    expect(mockSendEmail).toHaveBeenCalledWith('43542873-39f0-4c6a-85a2-4303aa1d2156', 'some.person@defra.gov.uk', { personalisation: { body_message: 'Some text for the email' } })
  })

  test('should throw if exception occurs', async () => {
    await processNotification(validMessage)
    expect(mockSendEmail).toHaveBeenCalledWith('43542873-39f0-4c6a-85a2-4303aa1d2156', 'some.person@defra.gov.uk', { personalisation: { body_message: 'Some text for the email' } })
  })
})
