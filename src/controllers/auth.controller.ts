import { Request, Response } from 'express'
import { CreateUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { hashing } from '../utils/hashing'
import { createUser } from '../services/auth.service'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const { error, value } = CreateUserValidation(req.body)
  if (error) {
    logger.error({ error: error.details[0].message }, 'ERR: auth - register')
    return res.status(422).send({ status: false, statusCode: 422, error: error.details[0].message })
  }

  try {
    value.password = `${hashing(value.password)}`

    await createUser(value)
    return res.status(201).send({ status: true, statusCode: 201, message: 'success register user' })
  } catch (error) {
    logger.error(error, 'ERR: auth - register')
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
