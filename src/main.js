import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './langs'
// vant 按需引入 减少体积
import '@/utils/filter' // 引入filter
import './styles/index.scss'
// import './assets/css/api.css'
import color from '@/styles/variables.js'
import { storage } from "@/utils/oldVersionFunc";
// 复制
import VueClipboard from 'vue-clipboard2'
import {
  List,
  PullRefresh,
  Dialog,
  Switch,
  Popup,
  Icon,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  SwipeCell,
  DropdownMenu,
  DropdownItem,
  Tabbar,
  TabbarItem,
  Loading,
  Skeleton,
  Button
} from 'vant';

import '@/http/mock';
Vue.use(VueClipboard)

// 初始化公共组件
Vue.use(List)
  .use(Skeleton)
  .use(PullRefresh)
  .use(Switch)
  .use(Popup)
  .use(Icon)
  .use(Collapse)
  .use(CollapseItem)
  .use(Cell)
  .use(CellGroup)
  .use(Tabs)
  .use(Tab)
  .use(SwipeCell)
  .use(Loading)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Button)
  .use(Tabbar)
  .use(TabbarItem)
// import './permission'
// import VConsole from 'vconsole'
// new VConsole()
Vue.prototype.$color = color
if (process.env.VUE_APP_IS_APP) {
  window.apiready = function () {
    console.log('app端运行中')
    // 读取storage数据
    if (window.api) {
      storage.toReadAllStorage(initApp)
    }
  }
} else {
  console.log('网页端运行中')
  initApp()
}

function initApp() {
  Vue.config.productionTip = false
  Vue.prototype.i18n = i18n
  new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}
