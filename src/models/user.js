import mongoose, { model } from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Number, required: true },
})

const User = model('User', userSchema)
export default User
