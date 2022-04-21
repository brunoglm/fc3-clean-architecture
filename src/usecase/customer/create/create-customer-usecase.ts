import customerFactory from "../../../domain/customer/factory/customer-factory"
import CustomerRepositoryInterface from "../../../domain/customer/repository/customerRepositoryInterface"
import Address from "../../../domain/customer/value-object/address"
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create-customer.dto"

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
    const customer = customerFactory.createWithAddress(input.name, address)

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip
      }
    }
  }
}