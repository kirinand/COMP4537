import { useAppStore } from '@/store/app'

export const getUser = () => {
  return useAppStore().user
}

export const setUser = ({ isLoggedIn, isAdmin }) => {
  useAppStore().setUser({ isLoggedIn, isAdmin })
}