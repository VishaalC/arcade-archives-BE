import Rating from '../models/rating'

const readAllRatings = async () => {
  const res = await Rating.find()
  return res
}

const addRating = async (rating) => {
  const res = await Rating.create(rating)
  return res
}

export const RatingService = { readAllRatings, addRating }
