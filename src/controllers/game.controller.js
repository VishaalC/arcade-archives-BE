import { gameService } from '../services/games.service.js'
import { logger } from '../logger/logger.js'
import { sendResponse, sendErrorResponse } from '../utils/response.utils.js'
import { LOGGER_CONSTANTS } from '../constants/logger.constants.js'
import {
  ERROR_MESSAGE,
  STATUS_CODE,
  STATUS_MESSAGES,
} from '../constants/response.constants.js'
import { RatingService } from '../services/ratings.service.js'
import { ReviewService } from '../services/reviews.service.js'

const readGames = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.READ_GAMES)
  try {
    const games = await gameService.readAllGames()
    games.length != 0
      ? sendResponse(res, games, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
      : sendResponse(res, '', STATUS_MESSAGES.NOT_FOUND, STATUS_CODE.NOT_FOUND)
    logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.READ_GAMES_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.GAME_CONTROLLER.READ_GAMES_ERROR)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

const readOneGame = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.READ_GAME)
  try {
    const id = req.params.id
    const game = await gameService.readOneGame(id)
    const reviews = await ReviewService.readAllReviewsForOneGame(id)
    const ratings = await RatingService.readRatingsForOneGame(id)
    const fullGameDetails = { game, ratings: ratings, reviews: reviews }
    game
      ? sendResponse(
          res,
          fullGameDetails,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK
        )
      : sendResponse(res, '', STATUS_MESSAGES.NOT_FOUND, STATUS_CODE.OK)
    logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.READ_GAME_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.GAME_CONTROLLER.READ_GAME_ERROR)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

const addGame = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_GAME)
  try {
    const newGame = { ...req.body, image: req.file.path }
    const addedGame = await gameService.addGame(newGame)
    sendResponse(res, addedGame, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
    logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_GAME_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_GAME_FAILURE)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

const addRating = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_RATING)
  try {
    const newRating = await RatingService.addRating(req.body)
    newRating
      ? sendResponse(res, newRating, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
      : sendResponse(
          res,
          ERROR_MESSAGE.GAME_USER_NOT_FOUND,
          STATUS_MESSAGES.NOT_FOUND,
          STATUS_CODE.NOT_FOUND
        )
    logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_RATING_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_RATING_FAILURE)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

const addReview = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_REVIEW)
  try {
    const newReview = await ReviewService.addReview(req.body)
    newReview
      ? sendResponse(res, newReview, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
      : sendResponse(
          res,
          ERROR_MESSAGE.GAME_USER_NOT_FOUND,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK
        )
    logger.info(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_REVIEW_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.GAME_CONTROLLER.ADD_REVIEW_FAILURE)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

export const gameController = {
  readGames,
  readOneGame,
  addGame,
  addRating,
  addReview,
}
