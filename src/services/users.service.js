import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { APP_CONSTANTS } from '../constants/app.constants.js'
import { ERROR_MESSAGE } from '../constants/response.constants.js'

const readOneUser = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch {
    throw new Error(ERROR_MESSAGE.USER_RETRIEVE_ERROR)
  }
}

const readAllUsers = async () => {
  try {
    const users = await User.find()
    return users
  } catch {
    throw new Error(ERROR_MESSAGE.USER_RETRIEVE_ERROR)
  }
}

const addUser = async (user) => {
  try {
    const existingUser = await User.findOne({ email: { $eq: user.email } })
    if (existingUser) {
      throw new Error(ERROR_MESSAGE.USER_ALREADY_EXISTS)
    } else {
      const hashedPassword = await bcrypt.hash(
        user.password,
        APP_CONSTANTS.SALT_ROUNDS
      )
      const addedUser = await User.create({ ...user, password: hashedPassword })
      return addedUser
    }
  } catch (error) {
    throw error
  }
}

export const UserService = { readAllUsers, readOneUser, addUser }
