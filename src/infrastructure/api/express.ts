import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/customerModel'
import { customerRoute } from './routes/customer-route'
import { productRoute } from './routes/product-route'
import ProductModel from '../product/repository/sequelize/productModel'

export const app: Express = express()
app.use(express.json())
app.use('/customers', customerRoute)
app.use('/products', productRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })
  await sequelize.addModels([CustomerModel])
  await sequelize.addModels([ProductModel])
  await sequelize.sync()
}
setupDb()
