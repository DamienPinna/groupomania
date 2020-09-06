import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import AddGif from '../views/Add-gif.vue'
import GifSelect from '../views/Gif-select.vue'

Vue.use(VueRouter)

const guardMyRoute = (to, from, next) => {
   const tokenFromStorage = localStorage.getItem('token');
   if (tokenFromStorage) next();
   else next('/');
}

const routes = [
   {path: '/', name: 'Login', component: Login},
   {path: '/signup', name: 'Signup', component: Signup},
   {path: '/home', name: 'Home', component: Home, beforeEnter: guardMyRoute},
   {path: '/add-gif', name: 'Add-gif', component: AddGif, beforeEnter: guardMyRoute},
   {path: '/gif-select/:id', name: 'gif-select', component: GifSelect, beforeEnter: guardMyRoute}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
