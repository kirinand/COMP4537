import { useAppStore } from '@/store/app'

export const setUser = ({ isLoggedIn, isAdmin, calls_made }) => {
  useAppStore().setUser({ isLoggedIn, isAdmin, calls_made })
}