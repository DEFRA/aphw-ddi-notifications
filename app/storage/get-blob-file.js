const { blobServiceClient } = require('./get-blob-client')
const { storageConfig } = require('../config')

const getBlobFile = async (filename, containerName = null) => {
  const container = blobServiceClient.getContainerClient(
    containerName === 'certificates' ? storageConfig.certificatesContainer : storageConfig.attachmentsContainer
  )

  await container.createIfNotExists()

  const blobClient = container.getBlockBlobClient(filename)

  const exists = await blobClient.exists()

  if (!exists) {
    throw new Error(`Attachment (${filename}) does not exist`)
  }

  return blobClient.downloadToBuffer()
}

module.exports = {
  getBlobFile
}
