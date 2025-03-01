import { UserService } from '../services/users.service.js'
import { logger } from '../logger/logger.js'
import { LOGGER_CONSTANTS } from '../constants/logger.constants.js'
import {
  STATUS_CODE,
  STATUS_MESSAGES,
} from '../constants/response.constants.js'
import { RatingService } from '../services/ratings.service.js'
import { ReviewService } from '../services/reviews.service.js'
import { sendResponse, sendErrorResponse } from '../utils/response.utils.js'

const readUsers = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_READ_USERS)
  try {
    const users = await UserService.readAllUsers()
    sendResponse(res, users, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
    logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_READ_USER_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.USER_CONTROLLER_READ_USER_ERROR)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

const readOneUser = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_READ_USER)
  try {
    const id = req.params.id
    const user = await UserService.readOneUser(id)
    const reviews = await ReviewService.readAllReviewsForOneUser(id)
    const ratings = await RatingService.readRatingsForOneUser(id)
    const fullUserDetails = { user, reviews: reviews, ratings: ratings }
    user
      ? sendResponse(
          res,
          fullUserDetails,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK
        )
      : sendResponse(
          res,
          user,
          STATUS_MESSAGES.NOT_FOUND,
          STATUS_CODE.NOT_FOUND
        )
    logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_READ_USER_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.USER_CONTROLLER_READ_USERS_ERROR)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

const addUser = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_ADD_USER)
  try {
    const newUser = { ...req.body }
    req.file ? (newUser.image = req.file.path) : ''
    const addedUser = await UserService.addUser(newUser)
    sendResponse(res, addedUser, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
    logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_ADD_USER_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.USER_CONTROLLER_ADD_USER_ERROR)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

const editUser = async (req, res) => {
  logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_EDIT_USER)
  try {
    const newUser = req.body
    const editedUser = await UserService.editUser(newUser)
    editedUser
      ? sendResponse(res, editedUser, STATUS_MESSAGES.SUCCESS, STATUS_CODE.OK)
      : sendResponse(res, '', STATUS_MESSAGES.NOT_FOUND, STATUS_CODE.NOT_FOUND)
    logger.info(LOGGER_CONSTANTS.USER_CONTROLLER_EDIT_USER_SUCCESS)
  } catch (error) {
    logger.error(LOGGER_CONSTANTS.USER_CONTROLLER_EDIT_USER_ERROR)
    sendErrorResponse(
      res,
      STATUS_CODE.INTERNAL_SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error.message
    )
  }
}

export const userController = { readUsers, readOneUser, addUser, editUser }
