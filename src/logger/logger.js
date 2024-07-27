import winston, { transports } from 'winston'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  level: 'info',
  transports: [
    new transports.File({
      filename: 'logs/combinedlogs.log',
    }),
    new transports.File({
      filename: 'logs/errorLogs.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/warningLogs.log',
      level: 'warn',
    }),
  ],
})

export { logger }
