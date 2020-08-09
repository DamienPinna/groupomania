import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddGif from '../views/Add-gif.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
   {path: '/', name: 'Login', component: Login},
   {path: '/signup', name: 'Signup', component: Signup},
   {path: '/home', name: 'Home', component: Home},
   {path: '/add-gif', name: 'Add-gif', component: AddGif}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
