import Joi from 'joi'

interface ProductInterface {
  name: string
  price: number
}

export const CreateProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null)
  })
  return schema.validate(payload)
}
