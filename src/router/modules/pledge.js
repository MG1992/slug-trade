const pledge = () => import('@/views/pledge/pledge.vue')
const currencyShares = () => import('@/views/pledge/currencyShares.vue')
const myPledgeRecond = () => import('@/views/pledge/myPledgeRecond.vue')
const myAd = () => import('@/views/pledge/myAd.vue')
const collectionType = () => import('@/views/pledge/collectionType.vue')
const addCollection = () => import('@/views/pledge/addCollection.vue')

export default [
  {
    path: '/pledge',
    name: 'pledge',
    meta: {
      notkeepAlive: true
    },
    component: pledge
  },
  {
    path: '/currencyShares',
    name: 'currencyShares',
    meta: {
      notkeepAlive: true
    },
    component: currencyShares
  },
  {
    path: '/myPledgeRecond',
    name: 'myPledgeRecond',
    meta: {
      notkeepAlive: true
    },
    component: myPledgeRecond
  },
  {
    path: '/myAd',
    name: 'myAd',
    meta: {
      notkeepAlive: true
    },
    component: myAd
  },
  {
    path: '/collectionType',
    name: 'collectionType',
    meta: {
      notkeepAlive: true
    },
    component: collectionType
  },
  {
    path: '/addCollection',
    name: 'addCollection',
    meta: {
      notkeepAlive: true
    },
    component: addCollection
  }
]
