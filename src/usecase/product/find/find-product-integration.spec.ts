import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/productModel'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/productRepository'
import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find-product-usecase'

describe('Test find product use case', () => {
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

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)

    const product = new Product('123', 'bike', 1)

    await productRepository.create(product)

    const input = {
      id: '123',
    }

    const output = await usecase.execute(input)

    expect(output).toStrictEqual({
      id: '123',
      name: 'bike',
      price: 1,
    })
  })
})
