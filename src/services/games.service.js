import Game from '../models/game.js'
import { ERROR_MESSAGE } from '../constants/response.constants.js'
import { uploadImage } from './cloudinary.service.js'

const readOneGame = async (id) => {
  try {
    const game = await Game.findById(id)
    if (game) {
      return game
    } else {
      return
    }
  } catch {
    throw new Error(ERROR_MESSAGE.GAME_RETRIEVE_ERROR)
  }
}

const readAllGames = async () => {
  try {
    const games = await Game.find()
    return games
  } catch {
    throw new Error(ERROR_MESSAGE.GAME_RETRIEVE_ERROR)
  }
}

const addGame = async (game) => {
  try {
    const existingGame = await Game.findOne({
      name: game.name,
      developer: game.developer,
    })
    if (existingGame) {
      throw new Error(ERROR_MESSAGE.GAME_ALREADY_EXISTS)
    } else {
      const results = await uploadImage(game.image)
      const newGame = { ...game, image: results }
      const addedGame = Game.create(newGame)
      return addedGame
    }
  } catch (error) {
    throw error
  }
}

export const gameService = { readOneGame, readAllGames, addGame }
