<template>
  <GameEditor />
</template>


<script>
import GameEditor from '@/components/GameEditor.vue'

export default {
  components: {
    GameEditor
  },
  mounted() {
    // Clear game
    this.$store.dispatch('games/setGame', { playtime: 30 })
  }
}
</script>