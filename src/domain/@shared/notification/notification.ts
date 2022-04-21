export type NotificationErrorProps = {
  message: string
  context: string
}

export default class Notification {
  private errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }

  messagesByContext(context: string): string {
    let messages = ''
    messages = this.errors
      .filter((error) => error.context === context)
      .map((error) => error.message)
      .join(',')

    return `${context}: ${messages}`
  }

  messagesAll(): string {
    return this.errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(',')
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors
  }
}
