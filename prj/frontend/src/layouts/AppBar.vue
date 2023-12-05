<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <router-link to="/" class="router-link">
        {{ constants.AppName }}
      </router-link>
    </v-app-bar-title>
    <v-btn
      v-if="user.isLoggedIn && user.isAdmin"
    >
      <router-link to="/admin" class="router-link">
        {{ constants.AdminConsole }}
      </router-link>
    </v-btn>
    <!-- <v-btn
      v-if="user.isLoggedIn"
      @click="console.log('logout')"
    >
      {{ constants.Logout }}
    </v-btn> -->
  </v-app-bar>
</template>

<script>
  import constants from '@/constants'
  import { useAppStore } from '@/store/app'
  import { computed } from '@vue/reactivity'

  export default {
    setup() {
      const appStore = useAppStore()

      const user = computed(() => ({
        isLoggedIn: appStore.user.isLoggedIn,
        isAdmin: appStore.user.isAdmin
      }))

      return {
        constants,
        user
      }
    },
  }
  
</script>

<style scoped>
  @import '@/styles/styles.scss';
</style>
