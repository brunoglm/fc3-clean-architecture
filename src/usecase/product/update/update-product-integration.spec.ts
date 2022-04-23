import { Sequelize } from 'sequelize-typescript'
import productFactory from '../../../domain/product/factory/product-factory'
import ProductModel from '../../../infrastructure/product/repository/sequelize/productModel'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/productRepository'
import UpdateProductUseCase from './update-product-usecase'

describe('Unit test update product use case', () => {
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    const product = productFactory.create('a', 'bike', 1)
    await productRepository.create(product)

    const input = {
      id: product.id,
      name: 'bike Updated',
      price: 4,
    }

    const result = await updateProductUseCase.execute(input)

    expect(result).toStrictEqual(input)
  })
})
