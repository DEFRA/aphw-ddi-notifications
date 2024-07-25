const mockSubscribe = jest.fn()
const mockCloseConnection = jest.fn()

jest.mock('ffc-messaging', () => {
  const MockMessageReceiver = jest.fn().mockImplementation(() => ({
    subscribe: mockSubscribe,
    closeConnection: mockCloseConnection
  }))

  return {
    MessageReceiver: MockMessageReceiver
  }
})

const { start, stop } = require('../../../app/messaging/inbound/notification/index')

describe('Index Start Stop', () => {
  describe('Start', () => {
    test('should process valid message', async () => {
      await start()
      expect(mockSubscribe).toHaveBeenCalledTimes(1)
    })
  })

  describe('Stop', () => {
    test('should close connections', async () => {
      await stop()
      expect(mockCloseConnection).toHaveBeenCalledTimes(1)
    })
  })
})
