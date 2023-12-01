// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      isLoggedIn: false,
      isAdmin: false,
      calls_made: 0,
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
