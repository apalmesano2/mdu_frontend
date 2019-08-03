import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import UserProfile from '@/components/UserProfile'
import UserCreate from '@/components/UserCreate'
import NewsList from '@/components/NewsList'
import StockList from '@/components/StockList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user-list',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/user-list/:msg',
      name: 'UserUpdatedList',
      component: UserProfile
    },
    {
      path: '/user-create',
      name: 'UserCreate',
      component: UserCreate
    },
    {
      path: '/user-create/:pk',
      name: 'UserUpdate',
      component: UserCreate
    },
    {
      path: '/news',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/stock-list',
      name: 'StockList',
      component: StockList
    },
    {
      path: '/stock-list/:msg',
      name: 'StockUpdatedList',
      component: StockList
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
