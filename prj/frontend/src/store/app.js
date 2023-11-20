// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    setLoggedIn(value) {
      this.isLoggedIn = value
    },
  },
})
