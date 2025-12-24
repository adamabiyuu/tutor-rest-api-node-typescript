import mongoose from 'mongoose'
import config from '../config/environment'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) return

  if (!config.db) throw new Error('DB env is missing')

  await mongoose.connect(config.db)
  isConnected = true
  console.log('MongoDB connected')
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
