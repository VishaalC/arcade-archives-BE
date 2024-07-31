import { sendErrorResponse } from '../utils/response.utils.js'
import {
  STATUS_CODE,
  STATUS_MESSAGES,
} from '../constants/response.constants.js'
import { ERROR_MESSAGE } from '../constants/response.constants.js'

export const validatePathParam = (req, res, next) => {
  ;/^[0-9a-fA-F]{24}$/.test(req.params.id)
    ? next()
    : sendErrorResponse(
        res,
        STATUS_CODE.BAD_REQUEST,
        STATUS_MESSAGES.BAD_REQUEST,
        ERROR_MESSAGE.INVALID_PATH_PARAM
      )
}

export const validateData = (params, minLength, maxLength) => {
  return (req, res, next) => {
    let user = JSON.parse(JSON.stringify(req.body))
    let userSize = Object.keys(user).length
    let flag = false

    if (userSize == maxLength || userSize == minLength) {
      Object.keys(req.body).forEach((key) => {
        if (!params.includes(key)) {
          flag = true
        }
      })
    } else {
      flag = true
    }
    flag
      ? sendErrorResponse(
          res,
          STATUS_CODE.BAD_REQUEST,
          STATUS_MESSAGES.BAD_REQUEST,
          ERROR_MESSAGE.INVALID_USER_SCHEMA
        )
      : next()
  }
}
