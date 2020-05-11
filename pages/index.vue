<template>
  <v-container>
    <v-row>
      <h2>
        <v-icon>mdi-cards-playing-outline</v-icon>&nbsp;Boardgames Collection
      </h2>
    </v-row>

    <v-row>
      <v-data-table :headers="columns" :items="games" :items-per-page="5" class="elevation-1">
        <template v-slot:item.genres="{ item }">
          <v-chip
            v-for="genre in item.genres"
            v-bind:key="genre._id"
            style="margin-right:5px;"
          >{{ genre.name }}</v-chip>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
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
  computed: {
    something() {
      return 25
    },
    ...mapState({
      games: state => state.games.games,
      columns: state => state.games.columns,
      ui: state => state.main.ui
    })
  }
}
</script>