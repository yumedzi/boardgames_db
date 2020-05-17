<template>
  <client-only>
    <v-app dark>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
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
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>

        <v-toolbar-title v-text="title" />
      </v-app-bar>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
      <v-footer :fixed="fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </client-only>
</template>

<script>
export default {
  mounted() {
    const theme = localStorage.getItem('useDarkTheme')
    if (theme) {
      let dark_mode = true
      if (theme == 'false') {
        dark_mode = false
      }
      console.log('dark mode from storage ' + dark_mode)
      this.$store.dispatch('ui/setDarkMode', dark_mode)
      this.$vuetify.theme.dark = dark_mode
    }
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
          icon: 'mdi-cog-outline',
          title: 'Settings',
          to: '/settings'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Boardgames DB'
    }
  }
}
</script>
