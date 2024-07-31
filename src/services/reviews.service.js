import Review from '../models/review.js'
import { gameService } from './games.service.js'
import { UserService } from './users.service.js'

const readAllReviewsForOneGame = async (gameId) => {
  try {
    const reviews = await Review.find({ gameId: gameId })
    if (reviews.length === 0) {
      return
    } else {
      return reviews
    }
  } catch (error) {
    throw error
  }
}

const readAllReviewsForOneUser = async (userId) => {
  try {
    const reviews = await Review.find({ userId: userId })
    if (reviews.length === 0) {
      return
    } else {
      return reviews
    }
  } catch (error) {
    throw error
  }
}

const addReview = async (review) => {
  try {
    const gameExist = await gameService.readOneGame(review.gameId)
    const userExist = await UserService.readOneUser(review.userId)
    if (gameExist && userExist) {
      const addedReview = await Review.create(review)
      return addedReview
    } else {
      return
    }
  } catch (error) {
    throw error
  }
}

export const ReviewService = {
  readAllReviewsForOneGame,
  addReview,
  readAllReviewsForOneUser,
}
