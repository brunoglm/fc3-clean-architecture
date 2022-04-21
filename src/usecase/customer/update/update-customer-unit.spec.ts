import customerFactory from "../../../domain/customer/factory/customer-factory"
import Address from "../../../domain/customer/value-object/address"
import UpdateCustomerUseCase from "./update-customer-usecase"

const customer = customerFactory.createWithAddress('John', new Address('Street', 123, 'zip', 'city'))

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    number: 1234,
    zip: 'Zip Updated',
    city: 'City Updated'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)

    const result = await updateCustomerUseCase.execute(input)

    expect(result).toStrictEqual(input)
  })
})