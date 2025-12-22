import { Request, Response } from 'express'
import { CreateSessionValidation, CreateUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import { createUser, findUserByEmail } from '../services/auth.service'
import UserType from '../types/user.type'
import { signJWT } from '../utils/jwt'

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

// export const createSession = async (req: Request, res: Response) => {
//   const {error, value} = CreateSessionValidation(req.body)

//   if(error){
//      logger.error({ error: error.details[0].message }, 'ERR: auth - register')
//      return res.status(422).send({ status: false, statusCode: 422, error: error.details[0].message })
//     }
//     try {
//       const user: any = await findUserByEmail(value.email)
//       const isValid =checkPassword(value.password, user.password)

//       if(!isValid) return res.status(401).json({ status: false, statusCode: 401, message: 'invalid email or password' })

//       const accessToken = signJWT({ ...user }, {expiresIn: '1d'})

//       return res.status(200).send({ status: true, statusCode: 200, message: 'Login Success', data: {accessToken}})
//     } catch (error: any) {
//       logger.error({ error: error.message }, 'ERR: auth - register')
//       return res.status(422).send({ status: false, statusCode: 422, error: error.details[0].message })
//   }
// }

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = CreateSessionValidation(req.body)

  if (error) {
    logger.error({ error: error.details[0].message }, 'ERR: auth - login')
    return res.status(422).send({
      status: false,
      statusCode: 422,
      error: error.details[0].message
    })
  }

  try {
    const user: any = await findUserByEmail(value.email)
    if (!user) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'invalid email or password'
      })
    }

    const isValid = checkPassword(value.password, user.password)
    if (!isValid) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'invalid email or password'
      })
    }

    // ✅ PAYLOAD JWT HARUS BERSIH
    const payload = {
      _id: user._id.toString(),
      user_id: user.user_id,
      email: user.email,
      role: user.role
    }

    const accessToken = signJWT(payload, { expiresIn: '1d' })

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Login Success',
      data: { accessToken }
    })
  } catch (error: any) {
    logger.error(error, 'ERR: auth - login')
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: 'Internal server error'
    })
  }
}
