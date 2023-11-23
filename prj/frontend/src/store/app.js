// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      isLoggedIn: false,
      isAdmin: false,
    }
  }),
  actions: {
    setUser(value) {
      this.user = {
        ...this.user,
        ...value,
      }
    },

  },
})
