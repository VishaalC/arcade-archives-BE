import Review from '../models/review'

const readAllReviews = async () => {
  const res = await Review.find()
  return res
}

const addReview = async (review) => {
  const res = await Review.create(review)
  return res
}

export const RatingService = { readAllReviews, addReview }
