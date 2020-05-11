<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="addGame">
          <v-card ref="form" class="mx-auto" outlined>
            <v-card-text>
              <h1>
                <v-icon slot="prepend">mdi-sticker-plus-outline</v-icon>&nbsp;Add new game to collection
              </h1>

              <v-text-field v-model="new_game.name" label="Game Name" clearable>
                <v-icon slot="prepend">mdi-dice-5</v-icon>
              </v-text-field>

              <v-text-field
                v-model="new_game.short_description"
                label="Short description"
                clearable
                outlined
              >
                <v-icon slot="prepend">mdi-script-outline</v-icon>
              </v-text-field>

              <v-textarea v-model="new_game.description" label="Description" clearable outlined>
                <v-icon slot="prepend">mdi-script-text-outline</v-icon>
              </v-textarea>

              <!-- script-text-outline -->

              <v-select
                v-model="new_game.complexity"
                :items="complexities"
                label="Complexity"
                outlined
              >
                <v-icon slot="prepend">mdi-weight-lifter</v-icon>
              </v-select>

              <!--                GENRES                       -->

              <v-autocomplete
                v-model="new_game.genres"
                :items="genres"
                outlined
                chips
                clearable
                small-chips
                item-text="name"
                label="Select genres"
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >{{ data.item.name }}</v-chip>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-icon slot="prepend">mdi-sword-cross</v-icon>
              </v-autocomplete>

              <p class="subtitle-1">
                <v-icon>mdi-clock</v-icon>&nbsp;Game Round Time (minutes)
              </p>
              <v-slider
                v-model="new_game.playtime"
                class="align-center"
                :max="time_max"
                :min="time_min"
                hide-details
                thumb-label
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="new_game.playtime"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>

              <!--             NUMBER OF PEOPLE              -->

              <p class="subtitle-1">
                <v-icon>mdi-account-multiple</v-icon>&nbsp;Number of players (min - max)
              </p>
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                thumb-label
                class="align-center"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="range[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 0, $event)"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="range[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
              <v-file-input v-model="new_game.image" label="Image"></v-file-input>
              <v-file-input label="Rules (PDF)"></v-file-input>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" type="submit">
                <v-icon>mdi-content-save</v-icon>&nbsp;Submit
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="danger">
                <v-icon>mdi-cancel</v-icon>&nbsp;&nbsp;Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState } from 'vuex'
import GameService from '@/services/BoardgamesService.js'

export default {
  data() {
    return {
      new_game: { playtime: 30 },
      items: ['family', 'cooperative', 'aggressive', 'horror', 'zombie'],
      selected_genres: [],
      value: null,
      alignmentsAvailable: ['start', 'center', 'end', 'baseline', 'stretch'],
      alignment: 'center',
      dense: false,
      justifyAvailable: [
        'start',
        'center',
        'end',
        'space-around',
        'space-between'
      ],
      justify: 'center',
      min: 1,
      max: 12,
      range: [2, 4],
      time_min: 5,
      time_max: 240,
      time_needed: 30
    }
  },
  methods: {
    remove(item) {
      this.new_game.genres.splice(this.new_game.genres.indexOf(item.name), 1)
      this.new_game.genres = [...this.new_game.genres]
    },
    addGame() {
      console.log('Adding new game....')

      // Fix min-max players
      this.new_game.players_min = this.range[0]
      this.new_game.players_max = this.range[1]
      GameService.addGame(this.new_game)
    }
  },
  computed: {
    ...mapState({
      genres: state => state.games.genres,
      complexities: state => state.games.complexities,
      game: state => state.games.game
    })
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('games/fetchGenres')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events at this time. Please try again.'
      })
    }
  },
  mounted() {
    // Clear game
    this.$store.dispatch('games/setGame', {})
  }
}
</script>