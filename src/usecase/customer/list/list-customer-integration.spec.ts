import { Sequelize } from 'sequelize-typescript'
import ListCustomerUsecase from './list-customer-usecase'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customerModel'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customerRepository'

describe('Integration test for list customer use case', () => {
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

  it('should list a customer', async () => {
    const customerRepository = new CustomerRepository()
    const useCase = new ListCustomerUsecase(customerRepository)

    const customer1 = new Customer('123', 'John')
    const customer2 = new Customer('456', 'Emanoel')
    const address = new Address('Street', 123, 'zip', 'city')
    const address2 = new Address('Street2', 456, 'zip2', 'city2')
    customer1.changeAddress(address)
    customer2.changeAddress(address2)

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const output = await useCase.execute()

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
  })
})
