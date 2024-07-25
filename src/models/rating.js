import mongoose, { model } from 'mongoose'

const ratingSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  rating: { type: Number, required: true },
})

const Rating = model('Rating', ratingSchema)
export default Rating
