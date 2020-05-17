<template>
  <v-card class="mx-auto" outlined>
    <v-card-text>
      <v-row>
        <v-col class="col-4">
          <img width="200px" :src="currentGame.image ? currentGame.image.url : ''" />
        </v-col>
        <v-col class="col-8">
          <v-row>
            <v-col class="d-flex align-content-center flex-wrap">
              <h1>{{ currentGame.name }}</h1>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" @click="editDialog = true">
                <v-icon class="mr-1">mdi-file-document-edit</v-icon>Edit
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-divider class="mb-3" />
              <p>
                <v-icon class="mr-2" slot="prepend">mdi-script-outline</v-icon>
                {{ currentGame.short_description }}
              </p>
              <p>
                <v-icon class="mr-2" slot="prepend">mdi-weight-lifter</v-icon>
                <span class="text-capitalize">{{ currentGame.complexity }}</span>
              </p>
              <p>
                <v-icon class="mr-2" slot="prepend">mdi-sword-cross</v-icon>Genres:
                <v-chip
                  v-for="genre in currentGame.genres"
                  v-bind:key="genre._id"
                  style="margin-right:5px;"
                >{{ genre.name }}</v-chip>
              </p>
              <p>
                <v-icon class="mr-2" slot="prepend">mdi-clock</v-icon>Time needed:
                <span class="title">{{ currentGame.playtime }} minutes</span>
              </p>
              <p>
                <v-icon class="mr-2" slot="prepend">mdi-account-multiple</v-icon>Players:
                <span
                  class="title"
                >{{ currentGame.players_min }} - {{ currentGame.players_max }}</span>
              </p>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-dialog
              v-model="editDialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="editDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Update game</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="editDialog = false">Save</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <GameEditor :editGame="currentGame" mode="edit" />
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>


<script>
import { mapState } from 'vuex'
import ColorModePicker from '@/components/ColorModePicker.vue'
import GameEditor from '@/components/GameEditor.vue'
import GameService from '@/services/BoardgamesService.js'

export default {
  name: 'GameCard',
  props: {
    game: Object
  },
  components: {
    GameEditor
  },
  data() {
    return {
      currentGame: {},
      editDialog: false,
      currentGame: {}
    }
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
    console.log(this.game)
    this.currentGame = { ...this.game }
  }
}
</script>

<style>
</style>