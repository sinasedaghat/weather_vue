import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import MainView from '@/views/MainView.vue'
import HomeView from '@/views/main/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView,
          props: (route: RouteLocationNormalized) => ({ 
            default: true,
            q: route.query.city
          })
        },
        {
          path: '/favorites',
          name: 'Favorites',
          component: () =>  import('@/views/main/FavoritesView.vue')
        },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const hasFave = Boolean(localStorage.getItem('favorites'))
  if (to.name == 'Favorites') hasFave ? next() : next({ name: 'Home'})
  else next()
})

export default router
