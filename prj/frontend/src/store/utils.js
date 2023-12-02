import { useAppStore } from '@/store/app'

export const setUser = ({ isLoggedIn, isAdmin, callsMade, warning }) => {
  useAppStore().setUser({ isLoggedIn, isAdmin, callsMade, warning })
}