<template>
  <div class="notification-container">
    <transition-group name="list" tag="p">
      <NotificationBar
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'

export default {
  components: { NotificationBar },
  computed: mapState('notifications', ['notifications'])
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 70px;
  right: 0;
  padding-right: 18px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>