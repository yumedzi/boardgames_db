<template>
  <v-container>
    <v-row>
      <v-data-table
        :headers="columns"
        :items="games"
        :items-per-page="5"
        class="elevation-1"
        show-expand
        :single-expand="singleExpand"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon>mdi-cards-playing-outline</v-icon>&nbsp;Boardgames Collection
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click="$router.push('/add/')">
              <v-icon class="mr-2">mdi-sticker-plus-outline</v-icon>Add new game
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.genres="{ item }">
          <v-chip
            v-for="genre in item.genres"
            v-bind:key="genre._id"
            style="margin-right:5px;"
          >{{ genre.name }}</v-chip>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <p class="text-left subtitle-1">{{ item.description }}</p>
          </td>
        </template>
        <template v-slot:item.name="{ item }">
          <nuxt-link class="gameLink" :to="{ path: `/game/${item._id}` }">
            <v-avatar>
              <img :src="item.image.url" v-if="item.image" />
              <v-icon v-else>mdi-dice-5</v-icon>
            </v-avatar>
            {{ item.name }}
          </nuxt-link>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return { expanded: [], singleExpand: true }
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
</style>