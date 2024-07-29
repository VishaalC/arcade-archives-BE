import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { APP_CONSTANTS } from '../constants/app.constants.js'
import { ERROR_MESSAGE } from '../constants/response.constants.js'
import { uploadImage } from './cloudinary.service.js'

const readOneUser = async (id) => {
  try {
    const user = await User.findById(id)
    if (user) {
      return user
    } else {
      return
    }
  } catch (error) {
    throw error
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
      let addedUser
      const hashedPassword = await bcrypt.hash(
        user.password,
        APP_CONSTANTS.SALT_ROUNDS
      )
      if (user.image) {
        const results = await uploadImage(user.image, 'profile')
        addedUser = await User.create({
          ...user,
          password: hashedPassword,
          image: results,
        })
      } else {
        addedUser = await User.create({
          ...user,
          password: hashedPassword,
        })
      }
      return addedUser
    }
  } catch (error) {
    throw error
  }
}

const editUser = async (user) => {
  try {
    const editedUser = UserService.replaceOne({ _id: { $eq: user._id } }, user)
    if (editedUser) {
      return editedUser
    } else {
      return
    }
  } catch (error) {
    throw error
  }
}

export const UserService = { readAllUsers, readOneUser, addUser, editUser }
