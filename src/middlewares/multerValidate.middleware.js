import { upload } from '../config/multer.config.js'
import { sendErrorResponse } from '../utils/response.utils.js'
import {
  STATUS_CODE,
  STATUS_MESSAGES,
  ERROR_MESSAGE,
} from '../constants/response.constants.js'

export const validateImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    err
      ? sendErrorResponse(
          res,
          STATUS_CODE.BAD_REQUEST,
          STATUS_MESSAGES.BAD_REQUEST,
          ERROR_MESSAGE.INVALID_FILE
        )
      : next()
  })
}
