<template>
  <client-only>
    <v-app dark :style="$vuetify.theme.dark ? dark_style : light_style">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        :permanent="menuPermanent"
        app
      >
        <v-list v-for="(items, j) in linkGroups" :key="j" style="margin-top: 0px">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            v-if="!item.auth || (item.auth && $auth.loggedIn)"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-4" v-if="j != linkGroups.length - 1"></v-divider>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon v-if="!menuPermanent" @click.stop="drawer = !drawer" />
        <!-- <v-img :src="logo" height="20"></v-img> -->
        <v-toolbar-title v-text="title" />
        <v-spacer></v-spacer>
        <span v-if="$auth.loggedIn" class="mr-4">
          <span class="d-none d-sm-flex">
            <v-icon class="mr-1">mdi-account-key</v-icon>
            {{ $auth.user.email }}
          </span>
        </span>
        <v-btn v-if="$auth.loggedIn" @click="$auth.logout()">
          <v-icon>mdi-export</v-icon>
          <span class="d-none d-sm-flex ml-2">Sign Off</span>
        </v-btn>
        <v-btn v-else class="success" @click="$auth.login()">
          <v-icon>mdi-account-key</v-icon>
          <span class="d-none d-sm-flex ml-2">Sign In</span>
        </v-btn>
      </v-app-bar>
      <v-content>
        <v-container>
          <nuxt />
          <NotificationContainer />
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
import NotificationContainer from '@/components/NotificationContainer.vue'

export default {
  components: {
    NotificationContainer
  },
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
    if (!this.$auth.loggedIn) {
      this.$store.dispatch('notifications/add', {
        message: 'Please sign in to be able to add or update games.',
        type: 'warning'
      })
    }
  },
  data() {
    return {
      dark_style:
        'background-color: #000000; background-image: linear-gradient(162deg, #000000 0%, #2a3d2e 50%, #7b8155 100%)',
      light_style:
        'background-color: #21d4fd; background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%)',
      clipped: false,
      drawer: false,
      fixed: false,
      linkGroups: [
        [
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
            to: '/add',
            auth: true
          },
          {
            icon: 'mdi-help-circle',
            title: 'About',
            to: '/about'
          }
        ],
        [
          {
            icon: 'mdi-cog-outline',
            title: 'Settings',
            to: '/settings'
          }
        ]
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
      loading: state => state.ui.loading,
      notifications: state => state.notifications.notifications
    }),
    ...mapGetters(['isAuthenticated'])
  }
  // middleware: ['get_games', 'get_genres']
}
</script>
