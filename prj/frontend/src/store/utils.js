import { useAppStore } from '@/store/app'

export const setUser = ({ isLoggedIn, isAdmin }) => {
  useAppStore().setUser({ isLoggedIn, isAdmin })
}