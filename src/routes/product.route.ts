// import { Router } from 'express'

// const router = Router()

// router.get('/', async (req, res) => {
//   return res.json({ test: 'product route alive' })
// })

// export default router

import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller'
import { requireAdmin, requireUser } from '../middleware/auth'

const router = Router()

router.get('/', getProduct)
router.get('/:id', getProduct)

router.post('/', requireUser, requireAdmin, createProduct)
router.put('/:id', requireUser, requireAdmin, updateProduct)
router.delete('/:id', requireUser, requireAdmin, deleteProduct)

export default router
