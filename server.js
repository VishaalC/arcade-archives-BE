import express from 'express'
import connection from './src/config/db.config.js'
import { router } from './src/routes/users.js'

const app = express()

connection()
app.use('/user', router)

app.listen(8080, () => {
  console.log('listening on 8080')
})
