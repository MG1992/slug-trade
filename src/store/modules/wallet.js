const wallet = {
  namespaced: true,
  state: {
    // 地址
    addr: {},
  },
  mutations: {
    SET_ADDR: (state, addr) => {
      state.addr = addr
    },
  },
  actions: {
    evtSelectAddr({ commit }, addr) {
      commit("SET_ADDR", addr)
    }
  }
}
export default wallet