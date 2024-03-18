import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/recipe/:name',
    component: RecipeDetail,
    props: true
  },
  { 
    path: '/category/:category', 
    component: Category, 
    props: true 
  },
  { 
    path: '/subcategory/:category/:subcategory', 
    component: Subcategory, 
    props: true 
  },
  {
    path: '/recipe/:name', 
    component: RecipeDetail, 
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
