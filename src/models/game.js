import mongoose, { model } from 'mongoose'

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  developer: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  image: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
    },
  },
})

gameSchema.index({ name: 1, developer: 1 }, { unique: true })
const Game = model('Game', gameSchema)
export default Game
