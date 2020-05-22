import GameService from '@/services/BoardgamesService.js'

export default function ({ store }) {
  store.dispatch('games/fetchGames')
}