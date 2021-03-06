import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import UserProfile from '@/components/UserProfile'
import UserCreate from '@/components/UserCreate'
import NewsList from '@/components/NewsList'
import Sports from '@/components/Sports'
import SportEvents from '@/components/SportEvents'
import SportTeams from '@/components/SportTeams'
import SportHighlights from '@/components/SportHighlights'
import Stocks from '@/components/Stocks'
import Events from '@/components/Events'
import Weather from '@/components/Weather';

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
      path: '/user-create/:id',
      name: 'UserUpdate',
      component: UserCreate
    },
    {
      path: '/news',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/sports',
      name: 'Sports',
      component: Sports
    },
    {
      path:'/sportevents',
      name: 'SportEvents',
      component: SportEvents
    },
    {
      path:'/sportteams',
      name: 'SportTeams',
      component: SportTeams
    },
    {
      path:'/sporthighlights',
      name: 'SportHighlights',
      component: SportHighlights
    },
    {
      path: '/stocks',
      name: 'Stocks',
      component: Stocks
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
