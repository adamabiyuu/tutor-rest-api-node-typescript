import Joi from 'joi'
// import productType from '../types/product.type'
import type { ProductType } from '../types/product.type'

export const CreateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    size: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}
