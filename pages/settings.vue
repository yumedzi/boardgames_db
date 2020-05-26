<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card ref="form" class="mx-auto" outlined>
          <v-card-title>
            <v-icon slot="prepend">mdi-cog-outline</v-icon>&nbsp;Settings
          </v-card-title>
          <v-card-text>
            <v-divider></v-divider>
            <v-switch
              :input-value="dark_mode"
              @change="toggleDarkMode($event)"
              hide-details
              :label="`Dark Mode: ${dark_mode ? 'ON' : 'OFF'}`"
            ></v-switch>
            <v-switch
              :input-value="miniVariant"
              @change="toggleMiniVariant($event)"
              hide-details
              :label="`Menu mini variant: ${miniVariant ? 'ON' : 'OFF'}`"
            ></v-switch>
            <v-switch
              :input-value="menuPermanent"
              @change="toggleMenuPermanent($event)"
              hide-details
              :label="`Menu permanent: ${menuPermanent ? 'ON' : 'OFF'}`"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  methods: {
    toggleDarkMode(new_value) {
      new_value = Boolean(new_value)
      this.$store.dispatch('ui/setDarkMode', new_value)
      this.$vuetify.theme.dark = new_value
      localStorage.setItem('useDarkTheme', new_value.toString())
    },
    toggleMiniVariant(new_value) {
      new_value = Boolean(new_value)
      console.log(`Current value is ${this.miniVariant}`)
      this.$store.dispatch('ui/setMiniVariant', new_value)
      localStorage.setItem('miniVariant', new_value.toString())
    },
    toggleMenuPermanent(new_value) {
      new_value = Boolean(new_value)
      this.$store.dispatch('ui/setMenuPermanent', new_value)
      localStorage.setItem('menuPermanent', new_value.toString())
    }
  },
  computed: {
    ...mapState({
      dark_mode: state => state.ui.dark_mode,
      miniVariant: state => state.ui.miniVariant,
      menuPermanent: state => state.ui.menuPermanent
    })
  }
}
</script>