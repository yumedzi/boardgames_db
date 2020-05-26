<template>
  <v-container>
    <v-row>
      <v-col>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          class="carousel"
        >
          <v-carousel-item
            v-for="(game, i) in games"
            :key="i"
            :src="game.image ? game.image.url : none"
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
                    class="d-flex justify-center game-title"
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
.carousel {
  border-radius: 0.5vw;
}

.game-sheet {
  background: rgb(43, 43, 43);
  background: linear-gradient(
    180deg,
    rgba(33, 33, 33, 0.8) 0%,
    rgba(73, 73, 73, 0.3) 100%
  );
  border-radius: 1vw;
  padding: 20px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.75);
}

.game-title {
  font-family: verdana, arial, tahoma, helvetica, sans-serif;
  text-decoration: none;
  font-weight: bold;
  color: white !important;

  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.75), 1px 2px 2px rgba(0, 0, 0, 0.7),
    2px 3px 3px rgba(0, 0, 0, 0.6);
}
</style>