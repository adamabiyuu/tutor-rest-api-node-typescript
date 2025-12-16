import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { CreateProductValidation } from '../validation/product.validation'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('success get product data')
  return res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'Sepatu Sport', price: 500000 }] })
})
ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = CreateProductValidation(req.body)
  if (error) {
    // logger.error('ERR: product - create = ', error.details[0].message)
    logger.error({ error: error.details[0].message }, 'ERR: product - create')
    return res.status(422).send({ status: false, statusCode: 422, error: error.details[0].message, data: {} })
  }
  logger.info('Success add new Product')
  return res.status(200).send({ status: true, statusCode: 200, message: 'add Product success', data: value })
})
