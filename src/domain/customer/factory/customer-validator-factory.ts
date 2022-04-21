import ValidatorInterface from '../../@shared/validator/validator-interface'
import customer from '../entity/customer'
import CustomerYupValidator from '../validator/customer-yup-validator'

export default class CustomerValidationFactory {
  static create(): ValidatorInterface<customer> {
    return new CustomerYupValidator()
  }
}
