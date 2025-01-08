describe('storage', () => {
  const getStorageConfig = () => {
    const { storageConfig } = require('../../../app/config')
    return storageConfig
  }

  const getStorageConfigForError = () => {
    const storage = require('../../../app/config/storage')
    return storage
  }

  afterEach(() => {
    jest.resetModules()
  })

  test('should error if invalid item', () => {
    jest.mock('../../../app/lib/environment-helpers')
    const { getEnvironmentVariable } = require('../../../app/lib/environment-helpers')
    getEnvironmentVariable.mockImplementation(key => {
      if (key === 'AZURE_STORAGE_ACCOUNT_NAME') {
        return ''
      }
      return process.env[key]
    })
    expect(() => getStorageConfigForError()).toThrow('The blob storage config is invalid. "storageAccount" is not allowed to be empty')
  })

  test('should pass given correct', () => {
    jest.mock('../../../app/lib/environment-helpers')
    const { getEnvironmentVariable } = require('../../../app/lib/environment-helpers')

    const expectedStorageAccount = 'devstoreaccount1'
    const expectedAttachmentsContainer = 'attachments'

    getEnvironmentVariable.mockImplementation(key => {
      if (key === 'AZURE_STORAGE_ACCOUNT_NAME') {
        return expectedStorageAccount
      }
      if (key === 'AZURE_STORAGE_ATTACHMENTS_CONTAINER') {
        return expectedAttachmentsContainer
      }
      return process.env[key]
    })

    const storageConfig = getStorageConfig()
    expect(storageConfig.storageAccount).toBe(expectedStorageAccount)
    expect(storageConfig.attachmentsContainer).toBe(expectedAttachmentsContainer)
  })
})
