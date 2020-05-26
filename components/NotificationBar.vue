<template>
  <v-alert :type="notification.type">{{ notification.message }}</v-alert>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('notifications', ['remove'])
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
.notification-bar {
  display: flex;
}
</style>