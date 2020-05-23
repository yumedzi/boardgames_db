<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-tabs
          class="elevation-2"
          :grow="true"
          prev-icon="mdi-arrow-left-bold-box-outline"
          next-icon="mdi-arrow-right-bold-box-outline"
        >
          <v-tabs-slider></v-tabs-slider>

          <!-- ########### TABS ############## -->

          <v-tab href="#info" key="info">
            <v-icon class="mr-2">mdi-information</v-icon>Info
          </v-tab>

          <v-tab href="#desc" key="desc">
            <v-icon class="mr-2">mdi-script-text</v-icon>Description
          </v-tab>

          <v-tab v-if="game.rules" href="#rules" key="rules">
            <v-icon class="mr-2">mdi-microsoft-xbox-controller-menu</v-icon>Rules
          </v-tab>

          <!-- ####### TAB ITEMS ############### -->

          <v-tab-item key="info" value="info">
            <v-card flat tile>
              <v-card-text>
                <GameCard :game="game" />
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="desc" value="desc">
            <v-card class="mx-2 pa-2" flat tile outlined>
              <v-card-text>{{ game.description }}</v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="rules" value="rules">
            <v-card flat tile>
              <v-card-text>
                <v-alert
                  type="info"
                >By clicking the following button you will download/read rules in PDF file.</v-alert>
                <div class="d-flex justify-center">
                  <v-btn
                    x-large
                    color="success"
                    rounded
                    outlined
                    v-if="game.rules"
                    :href="game.rules.url"
                  >
                    <v-icon left>mdi-cloud-download</v-icon>Download Rules
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import BoardgamesService from '@/services/BoardgamesService.js'
import GameCard from '@/components/GameCard.vue'

export default {
  components: {
    GameCard
  },
  data() {
    return {
      tabs: 4
    }
  },
  methods: {
    remove(item) {
      this.new_game.genres.splice(this.new_game.genres.indexOf(item.name), 1)
      this.new_game.genres = [...this.new_game.genres]
    },
    updateGame() {
      console.log('Updating game....')

      // Fix min-max players
      this.new_game.players_min = this.range[0]
      this.new_game.players_max = this.range[1]
      GameService.addGame(this.new_game)
    }
  },
  computed: {
    ...mapState({
      game: state => state.games.game
    })
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('games/fetchGames')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events at this time. Please try again.'
      })
    }
  },
  mounted() {
    this.$store.dispatch('games/setCurrentGameById', {
      id: this.$route.params.id
    })
  }
}
</script>