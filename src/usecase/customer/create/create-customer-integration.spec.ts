import { Sequelize } from 'sequelize-typescript'
import CreateCustomerUseCase from './create-customer-usecase'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customerRepository'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customerModel'

const input = {
  name: 'John',
  address: {
    street: 'Street',
    number: 123,
    zip: 'Zip',
    city: 'City',
  },
}

describe('Integration test create customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)

    const result = await createCustomerUseCase.execute(input)

    const customerCreated = await customerRepository.find(result.id)

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    }

    expect(result).toStrictEqual(output)
    expect({
      id: customerCreated.id,
      name: customerCreated.name,
      address: {
        street: customerCreated.address.street,
        number: customerCreated.address.number,
        zip: customerCreated.address.zip,
        city: customerCreated.address.city,
      },
    }).toStrictEqual(output)
  })

  it('should thrown an error when name is missing', async () => {
    const customerRepository = new CustomerRepository()
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    input.name = ''
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow()
  })

  it('should thrown an error when street is missing', async () => {
    const customerRepository = new CustomerRepository()
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    input.address.street = ''
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Street is required'
    )
  })
})
