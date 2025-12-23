import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '../utils/jwt'

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization token missing'
    })
  }

  const token = authHeader.replace('Bearer ', '')
  const { valid, expired, decoded } = verifyJWT(token)

  if (!valid) {
    return res.status(401).json({
      message: expired ? 'Access token expired' : 'Invalid access token'
    })
  }

  // simpan user dari token
  res.locals.user = decoded
  next()
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user || user.role !== 'admin') {
    return res.status(403).json({
      message: 'Admin access only'
    })
  }

  next()
}

// import { Request, Response, NextFunction } from 'express'

// // export const requireUser = (req: Request, res: Response, next: NextFunction) => {
// //     const user = res.locals.user
// //     if(!user){
// //         return res.sendStatus(403)
// //     }
// //     return next()
// // }
// export const requireUser = (req: Request, res: Response, next: NextFunction) => {
//   if (!res.locals.user) {
//     return res.status(403).json({
//       message: 'Unauthorized'
//     })
//   }
//   next()
// }

// export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
//   const user = res.locals.user

//   if (!user || user.role !== 'admin') {
//     return res.status(403).json({
//       message: 'Admin access only'
//     })
//   }

//   next()
// }
