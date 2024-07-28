import express from 'express'
import { userController } from '../controllers/user.controller.js'
import { validatePathParam } from '../middlewares/validatePathParam.middleware.js'

const router = express.Router()
router.use(express.json())
router.get('/', userController.readUsers)
router.get('/:id', validatePathParam, userController.readOneUser)
router.post('/', userController.addUser)
export { router }
