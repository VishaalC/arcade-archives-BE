import mongoose, { model } from 'mongoose'

const review = mongoose.Schema({
  gameId: { type: String, required: true },
  review: { type: String, required: true },
  userId: { type: String, required: true },
})

const Review = model('Review', review)
export default Review
