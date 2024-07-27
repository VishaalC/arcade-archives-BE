import express from 'express'
import { userController } from '../controllers/user.controller.js'

const router = express.Router()
router.use(express.json())
router.get('/', userController.readUsers)

export { router }
