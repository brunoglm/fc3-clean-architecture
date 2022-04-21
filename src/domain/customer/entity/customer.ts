import Address from '../value-object/address'
import Entity from '../../@shared/entity/entity-abstract'
import NotificationError from '../../@shared/notification/notification-error'
import CustomerValidationFactory from '../factory/customer-validator-factory'

export default class Customer extends Entity {
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super(id)
    this._name = name
    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  public get rewardPoints(): number {
    return this._rewardPoints
  }

  get name(): string {
    return this._name
  }

  get address(): Address {
    return this._address
  }

  validate() {
    CustomerValidationFactory.create().validate(this)
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }
}
