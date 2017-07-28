import Vue from 'vue'
import Router from 'vue-router'
import homePage from 'components/homepage/homepage'
import Find from 'components/find/find'
import Vip from 'components/vip/vip'
import Star from 'components/star/star'
import Mine from 'components/mine/mine'
import Setup from 'components/setup/setup'
import moreNav from 'components/moreNav/moreNav'
import Search from 'components/search/search'
import History from 'components/history/history'
import Player from 'components/player/player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: homePage
    },
    {
      path: '/moreNav',
      component: moreNav
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/history',
      component: History
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/vip',
      component: Vip
    },
    {
      path: '/star',
      component: Star
    },
    {
      path: '/mine',
      component: Mine,
      children: [
        {
          path: 'setup',
          component: Setup
        }
      ]
    },
    {
      path: '/player',
      component: Player
    }
  ]
})
