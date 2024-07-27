export const sendResponse = (res, data, message, code) => {
  res.status(code).json({
    code,
    message,
    data,
  })
}

export const sendErrorResponse = (res, message, code) => {
  res.status(code).json({
    code,
    message,
  })
}
