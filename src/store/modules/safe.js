const state = {
    riskState: {
        State: 0,// 风险更新状态
        howto: 'risk',// 怎么进入编辑页面的(编辑:edit,新增:add,修改:update)
    }
}
const mutations = {
    SET_RISKSTATE(state, upstate) {
        state.riskState = upstate
    },
}
const actions = {
    upRiskState({ commit }, upstate) {
        commit('SET_RISKSTATE', upstate)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
