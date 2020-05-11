export const state = () => ({
  genres: ['card', 'family', 'economy', 'cooperative', 'aggressive', 'horror', 'zombie', 'RPG', 'party'],
  complexities: ['easy', 'medium', 'hard', 'ultra'],
  games: [
    {
      "name": "Monopoly",
      "description": "Economy family Board game",
      "min": 2,
      "max": 5,
      "genres": [
        "family",
        "economy",
        "party"
      ],
      "time": 60
    },
    {
      "name": "Exploding Kittens",
      "description": "Card version of Monopoly Economy Board game",
      "min": 2,
      "max": 5,
      "genres": [
        "card",
        "family",
        "economy",
        "party"
      ],
      "time": 15,
      "complexity": "easy"
    },
    {
      "name": "Night of the Living Dead",
      "description": "Zombie Survival coop game",
      "min": 2,
      "max": 4,
      "genres": [
        "zombie",
        "cooperative"
      ],
      "time": 90,
      "complexity": "medium"
    },
    {
      "name": "Monopoly Card",
      "description": "Card version of Monopoly Economy Board game",
      "min": 2,
      "max": 5,
      "genres": [
        "card",
        "family",
        "economy",
        "party"
      ],
      "time": 60,
      "complexity": "easy"
    },
    {
      "name": "Alias",
      "description": "Words-based Party game",
      "min": 2,
      "max": 8,
      "genres": [
        "party",
        "family"
      ],
      "time": 20,
      "complexity": "easy"
    }
  ],
  columns: [{
    text: 'Name',
    align: 'start',
    sortable: true,
    value: 'name'
  },
  { text: 'Description', value: 'description' },
  { text: 'Genres', value: 'genres' },
  { text: 'Complexity', value: 'complexity' },
  { text: 'Time', value: 'time' }
  ]
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}