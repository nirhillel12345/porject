import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import brain from '@/components/brain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/brain',
      name: 'brain',
      component: brain
    }
  ]
})