jest.mock('../../../app/messaging/inbound/notification/process-notification')
const { processNotification } = require('../../../app/messaging/inbound/notification/process-notification')

const { processNotificationMessage } = require('../../../app/messaging/inbound/notification/process-notification-message')

const validMessage = {
  body: {
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
}

const invalidMessage = {
  body: {
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
}

const mockCompleteMessage = jest.fn()
const mockDeadLetterMessage = jest.fn()

const mockReceiver = {
  completeMessage: mockCompleteMessage,
  deadLetterMessage: mockDeadLetterMessage
}

describe('ProcessNotificationMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    processNotification.mockResolvedValue()
  })

  test('should process valid message and complete', async () => {
    await processNotificationMessage(validMessage, mockReceiver)
    expect(mockCompleteMessage).toHaveBeenCalledWith(validMessage)
    expect(mockDeadLetterMessage).not.toHaveBeenCalled()
  })

  test('should process invalid message and deadletter', async () => {
    await processNotificationMessage(invalidMessage, mockReceiver)
    expect(mockCompleteMessage).not.toHaveBeenCalled()
    expect(mockDeadLetterMessage).toHaveBeenCalledWith(invalidMessage)
  })

  test('should handle non-validation error and not deadletter', async () => {
    processNotification.mockImplementation(() => { throw new Error('bad send') })
    await processNotificationMessage(validMessage, mockReceiver)
    expect(mockCompleteMessage).not.toHaveBeenCalled()
    expect(mockDeadLetterMessage).not.toHaveBeenCalled()
  })
})
