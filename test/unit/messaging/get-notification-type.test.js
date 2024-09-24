const { getNotificationType } = require('../../../app/messaging/inbound/notification/get-notification-type')

describe('GetNotificationType', () => {
  test('should handle generic-error type within string', async () => {
    const res = getNotificationType('something.generic-error')
    expect(res).toBe('generic-error')
  })

  test('should handle generic-error type', async () => {
    const res = getNotificationType('generic-error')
    expect(res).toBe('generic-error')
  })

  test('should handle verify-email type', async () => {
    const res = getNotificationType('verify-email')
    expect(res).toBe('verify-email')
  })

  test('should throw if invalid type', async () => {
    expect(() => getNotificationType('invalid')).toThrow('Unknown notification type: invalid')
  })
})
