jest.mock('../../app/messaging/inbound/notification')
const { start } = require('../../app/messaging/inbound/notification')

describe('app control flow', () => {
  beforeEach(() => {
    jest.useFakeTimers()

    require('../../app')
  })

  test('starts processing messages', () => {
    expect(start).toHaveBeenCalledTimes(1)
  })
})
