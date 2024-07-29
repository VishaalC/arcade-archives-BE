import express from 'express'
import { userController } from '../controllers/user.controller.js'
import {
  validatePathParam,
  validateData,
} from '../middlewares/validatePathParam.middleware.js'
import { validateImage } from '../middlewares/multerValidate.middleware.js'
import { ROUTE_CONSTANTS } from '../constants/route.constants.js'

const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.get('/', userController.readUsers)
router.get('/:id', validatePathParam, userController.readOneUser)
router.post(
  '/',
  validateImage,
  validateData(ROUTE_CONSTANTS.USER_SCHEMA),
  userController.addUser
)
export { router }
