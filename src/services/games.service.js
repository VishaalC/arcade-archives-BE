import Game from '../models/game.js'

const readOneGame = async (id) => {
  const res = await Game.findById(id)
  return res
}

const readAllGames = async () => {
  const res = await Game.find()
  return res
}

const addGame = async (game) => {
  const res = await Game.create(game)
  return res
}

export const gameService = { readOneGame, readAllGames, addGame }
