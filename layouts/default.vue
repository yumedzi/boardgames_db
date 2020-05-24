<template>
  <client-only>
    <v-app dark>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        :permanent="menuPermanent"
        app
      >
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-toolbar>
          <v-app-bar-nav-icon v-if="!menuPermanent" @click.stop="drawer = !drawer" />
          <!-- <v-img :src="logo" height="20"></v-img> -->
          <v-toolbar-title v-text="title" />
          <v-spacer></v-spacer>
          <v-btn class="primary" v-if="$auth.loggedIn" @click="$auth.logout()">
            <v-icon class="mr-2">mdi-account-arrow-right</v-icon>Sign Off
          </v-btn>
          <v-btn v-else class="success" @click="$auth.login()">
            <v-icon class="mr-2">mdi-account-key</v-icon>Sign In
          </v-btn>
        </v-toolbar>
      </v-app-bar>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-footer :fixed="fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
        <span>&copy; Viktor Moyseyenko</span>
      </v-footer>
    </v-app>
  </client-only>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  mounted() {
    const dark_storage = localStorage.getItem('useDarkTheme') || 'false'
    const mini_storage = localStorage.getItem('miniVariant') || 'false'
    const permament_storage = localStorage.getItem('menuPermanent') || 'false'
    let dark_mode = dark_storage == 'true'
    // console.log('dark mode from storage ' + dark_mode)
    this.$store.dispatch('ui/setDarkMode', dark_mode)
    this.$vuetify.theme.dark = dark_mode
    let miniVariant = mini_storage == 'true'
    // console.log('miniVariant from storage ' + miniVariant)
    this.$store.dispatch('ui/setMiniVariant', miniVariant)
    let menuPermanent = permament_storage == 'true'
    // console.log('menuPermanent from storage ' + menuPermanent)
    this.$store.dispatch('ui/setMenuPermanent', menuPermanent)
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-cards-playing-outline',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-dice-multiple',
          title: 'All games',
          to: '/list'
        },
        {
          icon: 'mdi-shuffle-variant',
          title: 'Random',
          to: '/random'
        },
        {
          icon: 'mdi-sticker-plus-outline',
          title: 'ADD',
          to: '/add'
        },
        {
          icon: 'mdi-help-circle',
          title: 'About',
          to: '/about'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Settings',
          to: '/settings'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'Boardgames DB',
      logo: '/assets/icons/logo.png'
    }
  },
  computed: {
    ...mapState({
      miniVariant: state => state.ui.miniVariant,
      menuPermanent: state => state.ui.menuPermanent,
      loading: state => state.ui.loading
    }),
    ...mapGetters(['isAuthenticated'])
  }
  // middleware: ['get_games', 'get_genres']
}
</script>
