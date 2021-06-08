import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import brain from '@/components/brain'
import iControlWeb from '@/components/iControlWeb'
import iControlMobile from '@/components/iControlMobile'

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
    },
    {
      path: '/iControlWeb',
      name: 'iControlWeb',
      component: iControlWeb
    },
    {
      path: '/iControlMobile',
      name: 'iControlMobile',
      component: iControlMobile
    },
  ]
})