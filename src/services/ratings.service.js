import Rating from '../models/rating.js'
import { gameService } from './games.service.js'
import { UserService } from './users.service.js'

const readRatingsForOneGame = async (gameId) => {
  try {
    const ratings = await Rating.find({ gameId: gameId })
    if (ratings.length == 0) {
      return
    } else {
      return ratings
    }
  } catch (error) {
    throw error
  }
}

const readRatingsForOneUser = async (userId) => {
  try {
    const ratings = await Rating.find({ userId: userId })
    if (ratings.length == 0) {
      return
    } else {
      return ratings
    }
  } catch (error) {
    throw error
  }
}

const addRating = async (rating) => {
  try {
    const gameExist = await gameService.readOneGame(rating.gameId)
    const userExist = await UserService.readOneUser(rating.userId)
    if (gameExist && userExist) {
      const addedRating = await Rating.create(rating)
      return addedRating
    } else {
      return
    }
  } catch (error) {
    throw error
  }
}

export const RatingService = {
  readRatingsForOneGame,
  addRating,
  readRatingsForOneUser,
}
