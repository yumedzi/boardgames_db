<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="addGame" id="GameForm">
          <v-card class="mx-auto" outlined>
            <v-card-text>
              <h1 v-if="mode === 'add'">
                <v-icon slot="prepend">mdi-sticker-plus-outline</v-icon>&nbsp;Add new game to collection
              </h1>

              <v-text-field v-model="currentGame.name" label="Game Name" clearable>
                <v-icon slot="prepend">mdi-dice-5</v-icon>
              </v-text-field>

              <v-text-field
                v-model="currentGame.short_description"
                label="Short description"
                clearable
                outlined
              >
                <v-icon slot="prepend">mdi-script-outline</v-icon>
              </v-text-field>

              <v-textarea v-model="currentGame.description" label="Description" clearable outlined>
                <v-icon slot="prepend">mdi-script-text-outline</v-icon>
              </v-textarea>

              <!-- script-text-outline -->

              <v-select
                v-model="currentGame.complexity"
                :items="complexities"
                label="Complexity"
                outlined
              >
                <v-icon slot="prepend">mdi-weight-lifter</v-icon>
              </v-select>

              <!--                GENRES                       -->

              <v-autocomplete
                v-model="currentGame.genres"
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
                v-model="currentGame.playtime"
                class="align-center"
                :max="time_max"
                :min="time_min"
                hide-details
                thumb-label
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="currentGame.playtime"
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
              <!-- <v-file-input v-model="currentGame.image" label="Image"></v-file-input> -->
              <v-file-input
                label="Image"
                prepend-icon="mdi-camera"
                v-model="currentGame.image"
                accept="image/png, image/jpeg, image/bmp"
              ></v-file-input>
              <v-file-input label="Rules (PDF)" v-model="currentGame.rules"></v-file-input>
            </v-card-text>

            <v-card-actions v-if="mode === 'add'">
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
  name: 'GameEditor',
  props: {
    mode: String,
    editGame: Object
  },
  data() {
    return {
      currentGame: {},
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
      this.currentGame.genres.splice(
        this.currentGame.genres.indexOf(item.name),
        1
      )
      this.currentGame.genres = [...this.currentGame.genres]
    },
    addGame() {
      console.log('Adding new currentGame....')

      // Fix min-max players
      this.currentGame.players_min = this.range[0]
      this.currentGame.players_max = this.range[1]
      // form = document.getElementById("loginForm")
      console.log(this.currentGame)

      GameService.addGame(this.currentGame)
    }
  },
  computed: {
    ...mapState({
      genres: state => state.games.genres,
      complexities: state => state.games.complexities,
      defaultGame: state => state.games.game
    })
  },
  // async fetch({ store, error }) {
  //   console.log('Fetching genres')

  //   try {
  //     await store.dispatch('games/fetchGenres')
  //   } catch (e) {
  //     error({
  //       statusCode: 503,
  //       message: 'Unable to fetch events at this time. Please try again.'
  //     })
  //   }
  // },
  // middleware: 'get_genres',
  mounted() {
    console.log('Mount of Editor....')
    console.log(this.props)
    if (this.editGame) {
      this.currentGame = { ...this.editGame }
    } else {
      this.currentGame = { ...this.defaultGame }
    }

    if (!this.mode) {
      this.mode = 'add'
    }
  }
}
</script>