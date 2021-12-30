const Mine = () =>
  import(/* webpackChunkName: "group-mine" */ '@/views/mine/Mine.vue')
const ActivateMiner = () =>
  import(/* webpackChunkName: "group-mine" */ '@/views/mine/ActivateMiner.vue')
const BrowserIndex = () =>
  import(/* webpackChunkName: "group-mine" */ '@/views/mine/browserIndex.vue')
const AccountDetail = () =>
  import(/* webpackChunkName: "group-mine" */ '@/views/mine/AccountDetail.vue')
const AccountManage = () =>
  import(/* webpackChunkName: "group-mine" */ '@/views/mine/AccountManage.vue')
const ImportNewAddress = () =>
  import(
    /* webpackChunkName: "group-mine" */ '@/views/mine/ImportNewAddress.vue'
  )
const ExportAddress = () =>
  import(
    /* webpackChunkName: "group-mine" */ '@/views/mine/ExportAddress.vue'
  )
const ExportSpecificAddr = () =>
  import(
    /* webpackChunkName: "group-mine" */ '@/views/mine/ExportSpecificAddr.vue'
  )
const Share = () =>
  import(
    /* webpackChunkName: "group-mine" */ '@/views/mine/Share.vue'
  )
const RecommendAward = () =>
  import(
    /* webpackChunkName: "group-mine" */ '@/views/mine/RecommendAward.vue'
  )
const ManageAward = () =>
  import(
    /* webpackChunkName: "group-mine" */ '@/views/mine/ManageAward.vue'
  )

export default [
  {
    path: '/mine',
    name: 'Mine',
    component: Mine,
  },
  {
    path: '/activateMiner',
    name: 'activateMiner',
    component: ActivateMiner,
  },
  {
    path: '/browserIndex',
    name: 'browserIndex',
    component: BrowserIndex,
  },
  {
    path: '/accountDetail',
    name: 'accountDetail',
    component: AccountDetail,
  },
  {
    path: '/accountManage',
    name: 'accountManage',
    component: AccountManage,
  },
  {
    path: '/importNewAddress',
    name: 'importNewAddress',
    component: ImportNewAddress,
  },
  {
    path: '/exportAddress',
    name: 'ExportAddress',
    component: ExportAddress,
  },
  {
    path: '/exportSpecificAddr',
    name: 'ExportSpecificAddr',
    component: ExportSpecificAddr,
  },
  {
    path: '/share',
    name: 'Share',
    component: Share,
  },
  {
    path: '/recommendAward',
    name: 'RecommendAward',
    component: RecommendAward,
  },
  {
    path: '/manageAward',
    name: 'ManageAward',
    component: ManageAward,
  }
  
]
