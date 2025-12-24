import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import deserializeToken from './middleware/deserializedToken'
import connectDB from './utils/connectDB'

const app = express()

connectDB()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(deserializeToken)

app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

export default app

// import express from 'express'
// import { routes } from './routes'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import connectDB from './utils/connectDB'
// import deserializeToken from './middleware/deserializedToken'

// const app = express()

// connectDB()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(cors())

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', '*')
//   res.setHeader('Access-Control-Allow-Headers', '*')
//   next()
// })

// app.use(deserializeToken)

// routes(app)

// export default app

// import express from 'express'
// import { routes } from './routes'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import './utils/connectDB'
// import deserializeToken from './middleware/deserializedToken'

// const app = express()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(cors())

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', '*')
//   res.setHeader('Access-Control-Allow-Headers', '*')
//   next()
// })

// app.use(deserializeToken)

// routes(app)

// export default app
