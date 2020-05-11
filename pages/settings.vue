<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card ref="form" class="mx-auto" outlined>
          <v-card-text>
            <h1>
              <v-icon slot="prepend">mdi-cog-outline</v-icon>&nbsp;Settings
            </h1>

            <v-checkbox
              :input-value="dark_mode"
              @change="toggleDarkMode($event)"
              hide-details
              inset
              :label="`Dark Mode: ${dark_mode}`"
            ></v-checkbox>
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
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {}
  },
  methods: {
    toggleDarkMode(new_value) {
      new_value = Boolean(new_value)
      console.log(`Current value is ${this.dark_mode}`)
      this.$store.dispatch('ui/setDarkMode', new_value)
      this.$vuetify.theme.dark = new_value
      localStorage.setItem('useDarkTheme', new_value.toString())
    }
  },
  mounted() {
    console.log(`Current dark mode from STORE is ${this.dark_mode}`)
  },
  computed: {
    genres() {
      return this.$store.state.games.genres
    },
    complexities() {
      return this.$store.state.games.complexities
    },
    dark_mode() {
      return this.$store.state.ui.dark_mode
    }
  }
}
</script>