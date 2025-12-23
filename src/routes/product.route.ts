import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller'
import { requireAdmin, requireUser } from '../middleware/auth'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post(
  '/',
  requireUser, // ⬅️ WAJIB dulu (verify JWT + expired)
  requireAdmin, // ⬅️ baru cek role
  createProduct
)
// ProductRouter.post('/', requireUser,requireAdmin, createProduct)
ProductRouter.put('/:id', requireUser, requireAdmin, updateProduct)
ProductRouter.delete('/:id', requireUser, requireAdmin, deleteProduct)
