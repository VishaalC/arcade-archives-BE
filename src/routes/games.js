import express from 'express'
import { gameController } from '../controllers/game.controller.js'
import { validateImage } from '../middlewares/multerValidate.middleware.js'
import { validatePathParam } from '../middlewares/validatePathParam.middleware.js'

const gameRouter = express.Router()
gameRouter.use(express.urlencoded({ extended: true }))
gameRouter.use(express.json())

gameRouter.get('/', gameController.readGames)
gameRouter.get('/:id', validatePathParam, gameController.readOneGame)
gameRouter.post('/', validateImage, gameController.addGame)
export { gameRouter }
