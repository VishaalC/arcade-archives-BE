import { gameService } from '../services/games.service.js'
import { logger } from '../logger/logger.js'
import { sendResponse, sendErrorResponse } from '../utils/response.utils.js'
import { LOGGER_CONSTANTS } from '../constants/logger.constants.js'
import {
  STATUS_CODE,
  STATUS_MESSAGES,
} from '../constants/response.constants.js'
import { RatingService } from '../services/ratings.service.js'

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
    game
      ? sendResponse(res, game, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
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
}

export const gameController = { readGames, readOneGame, addGame }
