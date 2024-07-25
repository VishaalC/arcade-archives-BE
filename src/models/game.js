import mongoose, { model } from 'mongoose'

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

const Game = model('Game', gameSchema)
export default Game
