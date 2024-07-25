import express from 'express'
import connection from './src/config/db.config.js'

const app = express()
const PORT = 3000

connection()

app.get('/', (req, res) => {
  res.send('what')
})

app.listen(PORT, () => {
  console.log('listening on 3000')
})
