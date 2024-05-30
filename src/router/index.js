  import { createRouter, createWebHistory } from 'vue-router'
  import HomeView from '../views/HomeView.vue'
  import AboutView from '../views/AboutView.vue'
  import Category from '../views/Category.vue'
  import Subcategory from '../views/Subcategory.vue'
  import RecipeDetail from '../views/RecipeDetail.vue'
  import ContactUs from '../views/ContactUs.vue'
  import Login from '../views/Login.vue'
  import Manage from '../views/Manage.vue'

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
      path: '/recipe/:id',
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
      name: 'subcategory',
      component: Subcategory, 
      props: true 
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUs
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    }
  ]

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

  export default router
