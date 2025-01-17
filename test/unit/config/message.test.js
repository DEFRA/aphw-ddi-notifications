describe('message', () => {
  const getMessageConfig = () => {
    const messageConfig = require('../../../app/config/message')
    return messageConfig
  }

  afterEach(() => {
    jest.resetModules()
  })

  jest.mock('applicationinsights', () => {
    return {}
  })

  test('should not use appinsights in dev', () => {
    jest.mock('../../../app/lib/environment-helpers')
    const { getEnvironmentVariable } = require('../../../app/lib/environment-helpers')
    getEnvironmentVariable.mockImplementation(key => {
      if (key === 'NODE_ENV') {
        return 'development'
      }
      return process.env[key]
    })

    const { notificationQueue } = getMessageConfig()
    expect(notificationQueue.appInsights).toEqual(undefined)
  })

  test('should use appinsights in production', () => {
    jest.mock('../../../app/lib/environment-helpers')
    const { getEnvironmentVariable } = require('../../../app/lib/environment-helpers')
    getEnvironmentVariable.mockImplementation(key => {
      if (key === 'NODE_ENV') {
        return 'production'
      }
      return process.env[key]
    })
    const { notificationQueue } = getMessageConfig()
    expect(notificationQueue.appInsights).toEqual({})
  })

  test('should error if invalid item', () => {
    jest.mock('../../../app/lib/environment-helpers')
    const { getEnvironmentVariable } = require('../../../app/lib/environment-helpers')
    getEnvironmentVariable.mockReturnValue({})
    expect(() => getMessageConfig()).toThrow('The message config is invalid')
  })
})
