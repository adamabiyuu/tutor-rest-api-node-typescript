import mongoose, { mongo } from "mongoose";
import config  from "../config/environment";
import { logger } from "./logger";

mongoose
.connect(`${config.db}`)
.then(() => {
    logger.info('Connected to mongoDB')
})
.catch((error) => {
    logger.info('Could not connect to DB')
    logger.error(error)
    process.exit(1)
})
