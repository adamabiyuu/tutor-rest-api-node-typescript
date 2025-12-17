import { Request, Response } from 'express'
import { addProductToDB, getProductById, getProductFromDB } from '../services/product.service'
import { logger } from '../utils/logger'
import { CreateProductValidation } from '../validations/product.validation'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = CreateProductValidation(req.body)
  if (error) {
    logger.error({ error: error.details[0].message }, 'ERR: product - create')
    return res.status(422).send({ status: false, statusCode: 422, error: error.details[0].message })
  }
  try {
    await addProductToDB(value)
    logger.info('Success add new Product')
    return res.status(201).send({ status: true, statusCode: 201, message: 'add Product success' })
  } catch (error) {
    logger.error(error, 'ERR: product - create')
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Success get product data')
      return res.status(200).send({ status: true, statusCode: 200, data: product })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, message: 'data not found', data: [] })
    }
  } else {
    const products = await getProductFromDB()
    logger.info('Success get product data')
    return res.status(200).send({ status: true, statusCode: 200, data: products })
  }
}
