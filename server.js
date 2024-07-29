import express from 'express'
import connection from './src/config/db.config.js'
import { router } from './src/routes/users.js'
import { cloudinaryConnection } from './src/config/cloudinary.config.js'

const app = express()

connection()
cloudinaryConnection()
app.use('/user', router)
app.listen(8080, () => {
  console.log('listening on 8080')
})
