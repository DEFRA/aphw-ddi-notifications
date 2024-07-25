const { NOTIFICATION_PREFIX } = require('../../../app/constants/message-prefixes')
describe('message-prefixes', () => {
  test('should add message prefixes to export', () => {
    expect(NOTIFICATION_PREFIX).toBe('uk.gov.defra.aphw-ddi.notification.')
  })
})
