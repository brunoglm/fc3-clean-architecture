import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/productModel'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/productRepository'
import CreateProductUseCase from './create-product-usecase'

const input = {
  type: 'a',
  name: 'bike',
  price: 1,
}

describe('Unit test create product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const result = await createProductUseCase.execute(input)

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    }

    expect(result).toStrictEqual(output)
  })
})
