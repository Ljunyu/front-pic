import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import jwt from 'jsonwebtoken'
import moment from 'moment'
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Home = () => import(/* webpackChunkName: 'reg' */ './views/home.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ './views/changenles/Index.vue')
const template1 = () => import(/* webpackChunkName: 'template1' */ './views/changenles/template1.vue')
const center = () => import(/* webpackChunkName: 'center' */ './views/Center.vue')
const usercenter = () => import(/* webpackChunkName: 'usercenter' */ './components/users/Center.vue')
const usermsg = () => import(/* webpackChunkName: 'usermsg' */ './components/users/Msg.vue')
const others = () => import(/* webpackChunkName: 'others' */ './components/users/Others.vue')
const posts = () => import(/* webpackChunkName: 'Posts' */ './components/users/Posts.vue')
const setting = () => import(/* webpackChunkName: 'Setting' */ './components/users/Setting.vue')
const users = () => import(/* webpackChunkName: 'users' */ './views/users.vue')
const myinfo = () => import(/* webpackChunkName: 'myinfo' */ './components/users/common/myinfo.vue')
const myadmin = () => import(/* webpackChunkName: 'admin' */ './components/users/common/admin.vue')
const changepwd = () => import(/* webpackChunkName: 'changepwd' */ './components/users/common/changepwd.vue')
const myfile = () => import(/* webpackChunkName: 'file' */ './components/users/common/file.vue')
const mycolle = () => import(/* webpackChunkName: 'mycolle' */ './components/users/common/mycolle.vue')
const myposts = () => import(/* webpackChunkName: 'file' */ './components/users/common/myposts.vue')
const NoFound = () => import(/* webpackChunkName: 'NoFound' */ './views//NoFound.vue')
const Confirm = () => import(/* webpackChunkName: 'confirm' */ './views/confirm.vue')
const addposts = () => import(/* webpackChunkName: 'addposts' */ './components/add.vue')
const deatil = () => import(/* webpackChunkName: 'detail' */ './components/contents/detail.vue')
Vue.use(Router)
const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Index',
          component: Index
        },
        {
          path: '/Index/:catlog',
          name: template1,
          component: template1
        }
      ]
    },
    {
      path: '/user/:uid',
      name: 'userhome',
      props: true,
      component: users
    },
    {
      path: '/addposts',
      name: 'addposts',
      props: true,
      meta: { requiresAuth: true },
      component: addposts
    },
    {
      path: '/deatil/:id',
      name: 'deatil',
      component: deatil
    },
    {
      path: '/Confirm',
      name: 'Confirm',
      component: Confirm
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') { next() } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/center',
      component: center,
      linkExactActiveClass: 'layui-this',
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'usercenter',
          component: usercenter
        },

        {
          path: 'msg',
          name: 'usermsg',
          component: usermsg
        },
        {
          path: 'others',
          name: 'others',
          component: others
        },
        {
          path: 'posts',
          component: posts,
          children: [
            {
              path: '',
              name: 'myposts',
              component: myposts
            },
            {
              path: 'mycolle',
              name: 'mycolle',
              component: mycolle
            }

          ]
        },
        {
          path: 'setting',
          component: setting,
          children: [
            {
              path: '',
              name: 'myinfo',
              component: myinfo
            },
            {
              path: 'myadmin',
              name: 'myadmin',
              component: myadmin
            },
            {
              path: 'myfile',
              name: 'myfile',
              component: myfile
            },
            {
              path: 'changepwd',
              name: 'changepwd',
              component: changepwd
            }
          ]
        }

      ]
    },
    {
      path: '/404',
      component: NoFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 先统一查看本地缓存判断token鉴权
  const token = localStorage.getItem('token')
  const userinfo = JSON.parse(localStorage.getItem('userinfo'))
  if (token !== '' && token !== null) {
    const paylod = jwt.decode(token)
    console.log(121212, paylod, moment().isBefore(moment(paylod.exp * 1000)))
    if (moment().isBefore(moment(paylod.exp * 1000))) { // 判断token是否过期
      store.commit('setuserinfo', userinfo)
      store.commit('setToken', token)
      if (!store.state.ws) {
        store.commit('initWebsocket', {})
      }
      next()
    } else {
      store.commit('setToken', '')
      store.commit('setuserinfo', '')
      localStorage.clear()
      next('/')
    }
  }
  // 通过路由元信息查看那个路由及子路由需要鉴权 进入判断
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const islogin = store.state.islogin
    console.log('路由守卫', from, to, islogin)
    if (islogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
