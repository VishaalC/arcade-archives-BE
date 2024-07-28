import express from 'express'
import { userController } from '../controllers/user.controller.js'
import {
  validatePathParam,
  validateData,
} from '../middlewares/validatePathParam.middleware.js'

const router = express.Router()
router.use(express.json())
router.get('/', userController.readUsers)
router.get('/:id', validatePathParam, userController.readOneUser)
router.post(
  '/',
  validateData(['name', 'password', 'userName', 'email', 'isAdmin']),
  userController.addUser
)
export { router }
