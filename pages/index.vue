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

  text-shadow: #fff 0px 0px 5px, #fff 0px 0px 10px, #fff 0px 0px 15px,
    #ff2d95 0px 0px 20px, #ff2d95 0px 0px 30px, #ff2d95 0px 0px 40px,
    #ff2d95 0px 0px 50px, #ff2d95 0px 0px 75px;

  text-shadow: 0 -1px 4px #fff, 0 -2px 10px #ff0, 0 -10px 20px #ff8000,
    0 -18px 40px #f00;
}
</style>