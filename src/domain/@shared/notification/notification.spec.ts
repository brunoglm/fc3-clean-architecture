import Notification from './notification'

describe('Unit tests for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    expect(notification.messagesByContext('customer')).toBe(
      'customer: error message'
    )

    const error2 = {
      message: 'error message2',
      context: 'customer',
    }
    notification.addError(error2)
    expect(notification.messagesByContext('customer')).toBe(
      'customer: error message,error message2'
    )

    const error3 = {
      message: 'error message3',
      context: 'order',
    }
    notification.addError(error3)
    expect(notification.messagesByContext('order')).toBe(
      'order: error message3'
    )

    expect(notification.messagesAll()).toBe(
      'customer: error message,customer: error message2,order: error message3'
    )
  })

  it('should check if notification has at least one error', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all errors props', () => {
    const notification = new Notification()
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    const errors = notification.getErrors()

    expect(errors[0].context).toBe(error.context)
    expect(errors[0].message).toBe(error.message)
  })
})
