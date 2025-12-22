// import mongoose from 'mongoose'

// const userSchema = new mongoose.Schema({
//   user_id: { type: String, unique: true },
//   email: { type: String, unique: true },
//   name: { type: String, default: '' },
//   password: { type: String, default: '' },
//   role: { type: String, default: 'regular' }
// })

// const userModel = mongoose.model('user', userSchema)

// export default userModel

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  email: { type: String, unique: true },
  name: { type: String, default: '' },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'regular'],
    default: 'regular'
  }
})

const userModel = mongoose.model('user', userSchema)

export default userModel
