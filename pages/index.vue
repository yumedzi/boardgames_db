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
                <div class="game-sheet">
                  <nuxt-link
                    class="d-flex justify-center game-title"
                    :class="{'display-1': $vuetify.breakpoint. smAndDown, 'display-2': $vuetify.breakpoint. mdAndUp}"
                    :to="`/game/${game.id}`"
                  >{{ game.name }}</nuxt-link>
                  <v-rating
                    class="d-flex justify-center"
                    :value="game.rating"
                    :readonly="true"
                    color="white"
                    full-icon="mdi-heart"
                    empty-icon="mdi-heart-outline"
                  ></v-rating>
                  <v-divider v-if="game.short_description"></v-divider>
                  <p
                    :class="{'subheading': $vuetify.breakpoint. smAndDown, 'display-1': $vuetify.breakpoint. mdAndUp}"
                    v-if="game.short_description"
                  >{{ game.short_description }}</p>
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
      ],
      overlay: false
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
.game-sheet {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 1vw;
  padding: 20px;
}

.game-title {
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-weight: bold;

  color: white !important;
  text-shadow: 4px 4px 7px rgba(9, 9, 9, 0.71);

  color: #ffffff;
  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
  color: #ffffff;
}
</style>