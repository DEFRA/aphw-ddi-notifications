const mockSendEmail = jest.fn()
const mockPrepareUpload = jest.fn()

const validMessage = {
  id: 'b68da60f-6638-4acd-93e6-77f34b0b4ead',
  time: '2024-07-24T16:39:00.000Z',
  specversion: '1.0',
  type: 'send-application-pack',
  source: 'aphw-ddi-portal',
  data: {
    personalisation: {
      personalisation: {
        body_message: 'Some text for the email',
        file_key_to_attach: 'link_to_file',
        link_to_file: 'dummy.pdf',
        index_number: 'ED123',
        dog_name: 'Rex',
        filename_for_display: 'DownloadThis.pdf'
      }
    },
    emailAddress: 'some.person@defra.gov.uk'
  }
}

describe('ProcessNotification with attachment', () => {
  jest.mock('notifications-node-client', () => {
    const MockNotifyClient = jest.fn().mockImplementation(() => ({
      sendEmail: mockSendEmail,
      prepareUpload: mockPrepareUpload
    }))

    return {
      NotifyClient: MockNotifyClient
    }
  })

  jest.mock('../../../app/storage/attachments')
  const { getAttachmentFile } = require('../../../app/storage/attachments')

  const { processNotification } = require('../../../app/messaging/inbound/notification/process-notification')

  beforeEach(async () => {
    jest.resetAllMocks()
    mockPrepareUpload.mockReturnValue('/download/123')
  })

  test('should process valid message and attach file', async () => {
    getAttachmentFile.mockResolvedValue('abcdef')

    await processNotification(validMessage)

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.anything(),
      'some.person@defra.gov.uk',
      {
        personalisation: {
          body_message: 'Some text for the email',
          link_to_file: '/download/123',
          index_number: 'ED123',
          dog_name: 'Rex',
          filename_for_display: 'DownloadThis.pdf'
        }
      })
  })

  test('should process valid message and attach file with no download name', async () => {
    getAttachmentFile.mockResolvedValue('abcdef')

    const message = { ...validMessage }
    delete message.data.personalisation.personalisation.filename_for_display

    await processNotification(message)

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.anything(),
      'some.person@defra.gov.uk',
      {
        personalisation: {
          body_message: 'Some text for the email',
          link_to_file: '/download/123',
          index_number: 'ED123',
          dog_name: 'Rex'
        }
      })
  })
})
