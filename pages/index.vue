<template>
  <v-container>
    <v-row>
      <v-col>
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item
            v-for="(game, i) in games"
            :key="i"
            :src="game.image ? game.image.url : ''"
          >
            <v-sheet :color="game.image ? 'transparent' : colors[i % colors.length]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="game-title">
                  <nuxt-link :to="`/game/${game.id}`">{{ game.name }}</nuxt-link>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      expanded: [],
      singleExpand: true,
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ]
    }
  },
  // async fetch({ store, error }) {
  //   try {
  //     await store.dispatch('games/fetchGames')
  //   } catch (e) {
  //     error({
  //       statusCode: 503,
  //       message: 'Unable to fetch events at this time. Please try again.'
  //     })
  //   }
  // },
  computed: {
    ...mapState({
      games: state => state.games.games,
      columns: state => state.games.columns,
      ui: state => state.main.ui
    })
  }
  // middleware: ['get_games', 'get_genres']
}
</script>

<style>
a.gameLink {
  text-decoration: none;
}

.game-title {
  font-size: 16px;
  font-size: 4vw;
  background-color: black;
}
</style>