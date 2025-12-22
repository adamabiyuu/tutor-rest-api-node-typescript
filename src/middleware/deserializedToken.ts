import { decode } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '../utils/jwt'

// const deserializeToken = async (req: Request, res: Response, next: NextFunction) => {
//     const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '');
//     if (!accessToken) {
//         return next();
//     }

//     const token: any = verifyJWT(accessToken)
//     if(token.decoded){
//         res.locals.user = token.decoded
//         return next()
//     }

//     if(token.expired){
//         return next()
//     }

//     return next()
// }
const deserializeToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('AUTH HEADER >>>', req.headers.authorization)

  res.locals.user = null

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return next()
  }

  const token = authHeader.replace('Bearer ', '')
  const result = verifyJWT(token)

  if (result.valid) {
    res.locals.user = result.decoded
  }

  return next()
}

export default deserializeToken
