import mongoose from 'mongoose'
import config from '../config/environment'
import { logger } from './logger'

const connectDB = async () => {
  if (!config.db) {
    logger.error('❌ DB environment variable is missing')
    return
  }

  try {
    await mongoose.connect(config.db)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Could not connect to DB')
    logger.error(error)
  }
}

export default connectDB

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
