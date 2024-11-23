import { createRouter, createWebHistory } from 'vue-router'

// Define all your app's routes here
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/PostsView.vue'),
  },
]

// Create a Vue Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Uses modern web history API
  routes, // Array of routes defined above
})

export default router
