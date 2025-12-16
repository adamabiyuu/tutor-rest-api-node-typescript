import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { CreateProductValidation } from '../validations/product.validation'

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = CreateProductValidation(req.body)
  if (error) {
    logger.error({ error: error.details[0].message }, 'ERR: product - create')
    return res.status(422).send({ status: false, statusCode: 422, error: error.details[0].message, data: {} })
  }
  logger.info('Success add new Product')
  return res.status(200).send({ status: true, statusCode: 200, message: 'add Product success', data: value })
}

export const getProduct = (req: Request, res: Response) => {
  const products = [
    { name: 'Sepatu', price: 500000 },
    { name: 'Kaos', price: 100000 }
  ]
  const {
    params: { name }
  } = req
  if (name) {
    const filterProduct = products.filter((product) => {
      if (product.name === name) {
        return product
      }
    })
    if (filterProduct.length === 0) {
      logger.info('Data not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Product not found', data: {} })
    }
    logger.info('Success get product data')
    return res.status(200).send({ status: true, statusCode: 200, data: filterProduct[0] })
  }
  logger.info('Success get product data')
  return res.status(200).send({ status: true, statusCode: 200, data: products })
}
