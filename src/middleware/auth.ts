import { Request, Response, NextFunction } from 'express'

// export const requireUser = (req: Request, res: Response, next: NextFunction) => {
//     const user = res.locals.user
//     if(!user){
//         return res.sendStatus(403)
//     }
//     return next()
// }
export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    return res.status(403).json({
      message: 'Unauthorized'
    })
  }
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
