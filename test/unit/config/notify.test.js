describe('message', () => {
  const getNotifyConfig = () => {
    const { notify } = require('../../../app/config')
    return notify
  }

  const getNotifyConfigForError = () => {
    const notify = require('../../../app/config/notify')
    return notify
  }

  afterEach(() => {
    jest.resetModules()
  })

  test('should error if invalid item', () => {
    jest.mock('../../../app/lib/environment-helpers')
    const { getEnvironmentVariable } = require('../../../app/lib/environment-helpers')
    getEnvironmentVariable.mockReturnValue({})
    expect(() => getNotifyConfigForError()).toThrow('The server config is invalid')
  })

  test('should pass given correct', () => {
    jest.mock('../../../app/lib/environment-helpers')
    const { getEnvironmentVariable } = require('../../../app/lib/environment-helpers')

    const expectedNotifyApiKey = '7bed1ce5-cd0a-4af0-b38c-77aa0410ebb0'
    const expectedGenericNotifyApiiKey = '35950de5-ffb2-47f1-bd6f-4e58e63d73e3'

    getEnvironmentVariable.mockImplementation(key => {
      if (key === 'NOTIFY_API_KEY') {
        return expectedNotifyApiKey
      }
      if (key === 'GENERIC_ERROR_TEMPLATE_ID') {
        return expectedGenericNotifyApiiKey
      }
      return process.env[key]
    })

    const notifyConfig = getNotifyConfig()
    expect(notifyConfig.apiKey).toBe(expectedNotifyApiKey)
    expect(notifyConfig.templates.genericError).toBe(expectedGenericNotifyApiiKey)
  })
})
