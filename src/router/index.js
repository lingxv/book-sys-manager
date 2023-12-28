import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: "/login", component: () => import('../views/Login.vue') },
  {
    path: '/home', component: () => import('../views/Home.vue'),
    children: [
      { path: '/', component: () => import('../views/WelCome.vue') },
      { path: '/managerList', component: () => import('../views/system/User.vue') },
      { path: '/permission', component: () => import('../views/system/Permission.vue') },
      { path: '/sysrole', component: () => import('../views/system/Role.vue') },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
