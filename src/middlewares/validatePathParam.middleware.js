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

export const validateData = (params) => {
  return (req, res, next) => {
    let flag = false
    if (params.length === Object.keys(req.body).length) {
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
          ERROR_MESSAGE.INVALID_PATH_PARAM
        )
      : next()
  }
}
