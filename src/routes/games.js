import express from 'express'
import { gameController } from '../controllers/game.controller.js'
import { validateImage } from '../middlewares/multerValidate.middleware.js'
import { ROUTE_CONSTANTS } from '../constants/route.constants.js'
import {
  validatePathParam,
  validateData,
} from '../middlewares/validatePathParam.middleware.js'

const gameRouter = express.Router()
gameRouter.use(express.urlencoded({ extended: true }))
gameRouter.use(express.json())

gameRouter.get('/', gameController.readGames)
gameRouter.get('/:id', validatePathParam, gameController.readOneGame)
gameRouter.post(
  '/',
  validateImage,
  validateData(ROUTE_CONSTANTS.GAME_SCHEMA, 5, 5),
  gameController.addGame
)
gameRouter.post(
  '/rating',
  validateData(ROUTE_CONSTANTS.RATING_SCHEMA, 3, 3),
  gameController.addRating
)
gameRouter.post(
  '/review',
  validateData(ROUTE_CONSTANTS.REVIEW_SCHEMA, 4, 4),
  gameController.addReview
)
export { gameRouter }
