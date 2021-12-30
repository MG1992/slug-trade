import { login, getUserInfo, register } from '@/http/modules/user'
import { storage } from '@/utils/oldVersionFunc.js'
console.log(storage);
const userInfo = storage.get('userInfo')

const user = {
  namespaced: true,
  state: {
    token: storage.get('token'),
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      storage.set('token', token)
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      storage.set('userInfo', JSON.stringify(userInfo))
    },
  },

  actions: {
    // 登录
    LoginMicro({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      const loginType = userInfo.loginType
      return new Promise((resolve, reject) => {
        if (userInfo.register) {
          register(username, password, code, loginType)
            .then((res) => {
              commit('SET_TOKEN', res.token)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          login(username, password, code, uuid, loginType)
            .then((res) => {
              commit('SET_TOKEN', res.token)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        }
      })
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then((res) => {
            const user = res.data
            commit('SET_USER_INFO', user)
            commit('SET_TOKEN', user.token)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        storage.set('token', '')
        resolve()
      })
    },
  },
}

export default user
