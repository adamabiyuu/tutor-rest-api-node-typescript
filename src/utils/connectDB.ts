import mongoose from 'mongoose'
import config from '../config/environment'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  if (!config.db) {
    console.error('❌ DB env is missing')
    return
  }

  try {
    await mongoose.connect(config.db)
    isConnected = true
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err)
  }
}

// import mongoose, { mongo } from 'mongoose'
// import config from '../config/environment'
// import { logger } from './logger'

// mongoose
//   .connect(`${config.db}`)
//   .then(() => {
//     logger.info('Connected to mongoDB')
//   })
//   .catch((error) => {
//     logger.info('Could not connect to DB')
//     logger.error(error)
//     // process.exit(1)
//   })
