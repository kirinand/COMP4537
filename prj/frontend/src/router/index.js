// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { getUser } from '@/store/utils'

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
        props: { isLogin: true },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Auth.vue'),
        props: { isLogin: false },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !getUser().isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
