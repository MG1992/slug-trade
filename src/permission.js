// 权限控制文件
import router from './router'
// import store from './store'
// import { Toast } from 'vant'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { storage } from '@/utils/oldVersionFunc'

NProgress.configure({ showSpinner: false })

// 白名单 免登陆设置
const whiteList = ['/login', '/']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (storage.get('token')) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // if (store.state.user.roles.length === 0) {
      //   // 判断当前用户是否已拉取完user_info信息
      //   store.dispatch('GetInfo').then(() => {
      //     // 拉取user_info
      //     next({ ...to, replace: true })
      //   })
      //     .catch(err => {
      //       store.dispatch('FedLogOut').then(() => {
      //         Toast(err)
      //         next({ path: '/' })
      //       })
      //     })
      // } else {
      next()
      // }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  // next()
})

router.afterEach(() => {
  NProgress.done()
})
