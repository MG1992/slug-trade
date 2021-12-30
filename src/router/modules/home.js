const Home = () =>
  import(/* webpackChunkName: "group-home" */ '@/views/Home.vue')
const Notice = () =>
  import(/* webpackChunkName: "group-home" */ '@/views/notice/SystemNotice.vue')
const NoticeDetail = () =>
  import(/* webpackChunkName: "group-home" */ '@/views/notice/NoticeDetail.vue')
const Ore = () =>
  import(/* webpackChunkName: "group-home" */ '@/views/ore/OreList.vue')
const OreDetail = () =>
  import(/* webpackChunkName: "group-home" */ '@/views/ore/OreDetail.vue')
const OreEarningsRecords = () =>
  import(
    /* webpackChunkName: "group-home" */ '@/views/ore/OreEarningsRecords.vue'
  )
const Subscribe = () =>
  import(
    /* webpackChunkName: "group-home" */ '@/views/home/Subscribe.vue'
  )
const NodeReward = () =>
  import(
    /* webpackChunkName: "group-home" */ '@/views/home/NodeReward.vue'
  )
const SnailFund = () =>
  import(
    /* webpackChunkName: "group-home" */ '@/views/home/SnailFund.vue'
  )
export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/systemNotice',
    name: 'Notice',
    component: Notice,
  },
  {
    path: '/noticeDetail',
    name: 'NoticeDetail',
    component: NoticeDetail,
  },
  {
    path: '/ore',
    name: 'Ore',
    component: Ore,
  },
  {
    path: '/oreDetail',
    name: 'OreDetail',
    component: OreDetail,
  },
  {
    path: '/oreEarningsRecords',
    name: 'OreEarningsRecords',
    component: OreEarningsRecords,
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe,
  },
  {
    path: '/nodeReward',
    name: 'NodeReward',
    component: NodeReward,
  },
  {
    path: '/snailFund',
    name: 'SnailFund',
    component: SnailFund,
  }
]
