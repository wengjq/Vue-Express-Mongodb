import Vue from 'vue'
import Router from 'vue-router'
import List from '../components/List'
import Details from '../components/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/movie/:title',
      name: 'detail',
      component: Details
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})