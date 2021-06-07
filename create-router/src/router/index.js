import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import form from '@/components/form.vue'
import brain from '@/components/brain'
import iControlWeb from '@/components/iControlWeb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/form',
      name: 'form',
      component: form
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
    }
  ]
})