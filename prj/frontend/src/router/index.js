// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/app'
import axios from 'axios'
import { API_URL } from '@/config'
import { setUser } from '@/store/utils'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth.vue'),
        props: { type: 'login' },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Auth.vue'),
        props: { type: 'register' },
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/Auth.vue'),
        props: { type: 'forgot' },
      },
      {
        path: 'reset_password',
        name: 'ResetPassword',
        component: () => import('@/views/Auth.vue'),
        props: { type: 'reset' },
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
        meta: { requiresAuth: true },
        beforeEnter: (_to, _, next) => {
          if (useAppStore().user.isAdmin) {
            next()
          } else {
            next(false)
          }
        },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !useAppStore().user.isLoggedIn) {
    axios.post(`${API_URL}/login`, {}, { withCredentials: true })
    .then(response => {
      const { role, calls_made, warning } = response.data
      const isAdmin = role === 'admin'
      setUser({ 
        isLoggedIn: true,
        isAdmin,
        callsMade: calls_made,
        warning
      })
      next()
    })
    .catch(() => {
      next('/login')
    })
  } else {
    next()
  }
})

export default router
