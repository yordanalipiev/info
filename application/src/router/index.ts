import { createRouter, createWebHistory } from 'vue-router'

// Define all your app's routes here
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'), // Lazy-loaded Home view
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'), // Lazy-loaded About view
  },
]

// Create a Vue Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Uses modern web history API
  routes, // Array of routes defined above
})

export default router
