const { blobServiceClient } = require('./get-blob-client')
const { storageConfig } = require('../config')

const getBlobFile = async (filename, containerName = null) => {
  const containerToUse = containerName === 'certificates' ? storageConfig.certificatesContainer : storageConfig.attachmentsContainer
  const container = blobServiceClient.getContainerClient(containerToUse)

  await container.createIfNotExists()

  const blobClient = container.getBlockBlobClient(filename)

  const exists = await blobClient.exists()

  if (!exists) {
    throw new Error(`File ${filename} in container ${containerToUse} does not exist`)
  }

  return blobClient.downloadToBuffer()
}

module.exports = {
  getBlobFile
}
