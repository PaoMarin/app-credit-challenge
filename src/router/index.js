import Vue from 'vue'
import Router from 'vue-router'
import Clients from '@/components/Clients'
import NewClient from '@/components/NewClient'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/',
      name: 'NewClient',
      component: NewClient
    }
  ]
})
