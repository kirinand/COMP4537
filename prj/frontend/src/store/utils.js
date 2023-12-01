import { useAppStore } from '@/store/app'

export const setUser = ({ isLoggedIn, isAdmin, calls_made, warning }) => {
  useAppStore().setUser({ isLoggedIn, isAdmin, callsMade: calls_made, warning })
}