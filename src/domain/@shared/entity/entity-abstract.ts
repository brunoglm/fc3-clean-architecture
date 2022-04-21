import Notification from '../notification/notification'

export default abstract class Entity {
  protected _id: string
  protected _notification: Notification

  constructor(id: string) {
    this._notification = new Notification()
    this._id = id
  }

  get id(): string {
    return this._id
  }

  get notification(): Notification {
    return this._notification
  }
}
