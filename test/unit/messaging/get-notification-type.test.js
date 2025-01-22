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

  test('should handle user-feedback type', async () => {
    const res = getNotificationType('user-feedback')
    expect(res).toBe('user-feedback')
  })

  test('should handle user-invite type', async () => {
    const res = getNotificationType('user-invite')
    expect(res).toBe('user-invite')
  })

  test('should handle report-something type', async () => {
    const res = getNotificationType('report-something')
    expect(res).toBe('report-something')
  })

  test('should handle form2-submission-to-defra type', async () => {
    const res = getNotificationType('form2-submission-to-defra')
    expect(res).toBe('form2-submission-to-defra')
  })

  test('should handle form2-confirmation-to-police type', async () => {
    const res = getNotificationType('form2-confirmation-to-police')
    expect(res).toBe('form2-confirmation-to-police')
  })

  test('should handle email-application-pack type', async () => {
    const res = getNotificationType('email-application-pack')
    expect(res).toBe('email-application-pack')
  })

  test('should handle post-application-pack type', async () => {
    const res = getNotificationType('post-application-pack')
    expect(res).toBe('post-application-pack')
  })

  test('should handle withdrawal-confirmation type', async () => {
    const res = getNotificationType('withdrawal-confirmation')
    expect(res).toBe('withdrawal-confirmation')
  })

  test('should throw if invalid type', async () => {
    expect(() => getNotificationType('invalid')).toThrow('Unknown notification type: invalid')
  })
})
