const { blobServiceClient } = require('../../../app/storage/get-blob-client')
jest.mock('../../../app/storage/get-blob-client')

const downloadFn = jest.fn()

blobServiceClient.getContainerClient.mockReturnValue({
  createIfNotExists: jest.fn(),
  getBlockBlobClient: jest.fn().mockReturnValue({
    exists: jest.fn().mockResolvedValue(true),
    downloadToBuffer: downloadFn
  })
})

const { getBlobFile } = require('../../../app/storage/get-blob-file')

describe('storage repos get-blob-file', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getBlobFile', () => {
    test('should get attachment file if exists', async () => {
      const res = await getBlobFile()
      expect(res).not.toBe(null)
      expect(downloadFn).toHaveBeenCalled()
    })

    test('should throw if file doesnt exist', async () => {
      blobServiceClient.getContainerClient.mockReturnValue({
        createIfNotExists: jest.fn(),
        getBlockBlobClient: jest.fn().mockReturnValue({
          exists: jest.fn().mockResolvedValue(false),
          downloadToBuffer: downloadFn
        })
      })
      await expect(() => getBlobFile('file123.pdf')).rejects.toThrow('Attachment (file123.pdf) does not exist')
    })
  })
})
