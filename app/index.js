require('./insights').setup()
require('log-timestamp')
const { start, stop } = require('./messaging/inbound/notification')

/* istanbul ignore next */
process.on(['SIGTERM', 'SIGINT'], async () => {
  await stop()
  process.exit(0)
})

module.exports = (async () => {
  await start()
})()
