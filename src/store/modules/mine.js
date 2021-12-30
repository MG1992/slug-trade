import {
  getAddressInfoById,
  getTotalEarnings,
  getAddressList,
} from '@/http/modules/mine'
import { storage } from '@/utils/oldVersionFunc'
import router from '@/router'
const activateAddr = storage.get('activateAddr')

const mine = {
  namespaced: true,
  state: {
    // 当前激活地址
    activateAddr: activateAddr && activateAddr.includes('{') ? JSON.parse(activateAddr) : {},
    // 矿池收益金额
    amounts: {},
  },
  mutations: {
    SET_ACTIVATE_ADDR: (state, activateAddr) => {
      state.activateAddr = activateAddr
      storage.set('activateAddr', JSON.stringify(activateAddr))
    },
    SET_AVAILABLE_BALANCE: (state, availableBalance) => {
      state.availableBalance = availableBalance
      storage.set('availableBalance', availableBalance)
    },
    SET_TOTAL_EARNINGS: (state, amounts) => {
      state.amounts = amounts
      storage.set('amounts', amounts)
    },
  },
  actions: {
    // 获取激活地址信息
    GetActivateAddress({ commit }, id) {
      return new Promise((resolve, reject) => {
        getAddressInfoById(id)
          .then((res) => {
            commit('SET_ACTIVATE_ADDR', res.data)
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 矿池收益合计
    GetTotalEarnings({ commit }) {
      return new Promise((resolve, reject) => {
        getTotalEarnings()
          .then((res) => {
            commit('SET_TOTAL_EARNINGS', res.data)
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取地址列表
    GetAddressInfo() {
      return new Promise((resolve, reject) => {
        getAddressList()
          .then((res) => {
            let curAddrId = ''
            this.addressList = res.data
            this.addressList.find((item) => {
              if (item.status === 1) {
                curAddrId = item.id
              }
            })
            const info = {
              info: res.data,
              curAddrId,
            }
            resolve(info)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取激活地址信息
    GetActivateAddressBeforeAssurance({ state }) {
      return new Promise((resolve, reject) => {
        getAddressInfoById(state.activateAddr.id)
          .then((res) => {
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 判断当前OTC交易是否需要交纳保证金
    needAssurance({ dispatch }) {
      return new Promise((resolve, reject) => {
        dispatch('GetActivateAddressBeforeAssurance').then(data => {
          //是否为钱老板，0：否，1：是
          if (data.is_super === 0) {
            router.push('assuranceCash')
          }
          resolve(data)
        })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
}
export default mine
