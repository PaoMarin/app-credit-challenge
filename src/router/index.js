import Vue from 'vue'
import Router from 'vue-router'
import NewClient from '@/components/NewClient'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewClient',
      component: NewClient
    }
  ]
})
