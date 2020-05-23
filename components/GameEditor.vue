<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="addOrUpdateGame" ref="GameForm">
          <v-card class="mx-auto" outlined>
            <v-card-text>
              <h1 v-if="mode === 'add'">
                <v-icon slot="prepend">mdi-sticker-plus-outline</v-icon>&nbsp;Add new game to collection
              </h1>

              <v-text-field name="name" v-model="currentGame.name" label="Game Name" clearable>
                <v-icon slot="prepend">mdi-dice-5</v-icon>
              </v-text-field>

              <v-text-field
                name="short_description"
                v-model="currentGame.short_description"
                label="Short description"
                clearable
                outlined
              >
                <v-icon slot="prepend">mdi-script-outline</v-icon>
              </v-text-field>

              <v-textarea
                name="description"
                v-model="currentGame.description"
                label="Description"
                clearable
                outlined
              >
                <v-icon slot="prepend">mdi-script-text-outline</v-icon>
              </v-textarea>

              <!-- script-text-outline -->

              <v-select
                v-model="currentGame.complexity"
                :items="complexities"
                name="complexity"
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
                name="genres"
                :return-object="true"
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
                class="mt-10"
                :max="time_max"
                :min="time_min"
                ticks="always"
                step="15"
                thumb-label="always"
                hide-details
              ></v-slider>

              <!--             NUMBER OF PEOPLE              -->

              <p class="subtitle-1">
                <v-icon>mdi-account-multiple</v-icon>&nbsp;Number of players (min - max)
              </p>

              <v-range-slider
                v-model="players_number_range"
                :min="min"
                :max="max"
                ticks="always"
                thumb-label="always"
                class="mt-10"
              ></v-range-slider>
              <!-- <v-file-input v-model="currentGame.image" label="Image"></v-file-input> -->
              <v-file-input
                label="Image"
                name="image"
                prepend-icon="mdi-camera"
                v-model="currentGame.image"
                accept="image/png, image/jpeg, image/jpg, image/bmp"
              ></v-file-input>
              <v-file-input name="rules" label="Rules (PDF)" v-model="currentGame.rules"></v-file-input>
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
    game: Object
  },
  data() {
    return {
      currentGame: {},
      players_number_range: [2, 4],
      min: 1,
      max: 12,
      range: [2, 4],
      time_min: 15,
      time_max: 240
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
    addOrUpdateGame() {
      // Updating object with sliders data
      this.currentGame.players_min = this.players_number_range[0]
      this.currentGame.players_max = this.players_number_range[1]

      let data = { ...this.currentGame }
      delete data.image
      let formData = new FormData()
      formData.append('data', JSON.stringify(data))
      // console.log(this.$refs.GameForm.image)

      for (let fileInput of ['image', 'rules']) {
        try {
          if (this.currentGame[fileInput].size) {
            formData.append(
              `files.${fileInput}`,
              this.currentGame[fileInput],
              this.currentGame[fileInput].name
            )
          }
        } catch {
          console.log(`"No ${fileInput} file attached"`)
        }
      }

      if (this.mode === 'add') {
        this.$store.dispatch('games/addGame', { formData })
      } else {
        this.$store.dispatch('games/updateGame', {
          formData,
          id: this.currentGame.id
        })
      }
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
    if (this.game) {
      this.currentGame = { ...this.game }
    } else {
      this.currentGame = { ...this.defaultGame }
    }

    if (!this.mode) {
      this.mode = 'add'
    }
  }
}
</script>