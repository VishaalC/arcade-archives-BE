import User from '../models/user.js'

const readOneUser = async (id) => {
  const res = await User.findById(id)
  return res
}

const readAllUsers = async () => {
  const res = await User.find()
  return res
}

const addUser = async (user) => {
  const res = await User.create(user)
  return res
}

export const UserService = { readAllUsers, readOneUser, addUser }
