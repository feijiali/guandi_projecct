import api from "@/api/index";
var storageKey = "XMGJ_";
const state = {
    planInfo_node: sessionStorage.getItem(storageKey + "planInfo_node")
    ? JSON.parse(sessionStorage.getItem(storageKey + "planInfo_node"))
    : null,
    planInfo_type: localStorage.getItem(storageKey + "planInfo_type")
    ? JSON.parse(localStorage.getItem(storageKey + "planInfo_type"))
    : null,
};
const mutations = {
  SET_PLANINFO_NODE(state, payload) {
    state.planInfo_node = payload;
    sessionStorage.setItem(storageKey + "planInfo_node", payload);
  },
  SET_PLANINFO_TYPE(state, payload) {
    state.planInfo_type = payload;
    localStorage.setItem(storageKey + "planInfo_type", payload);
  },
};
const actions = {
  set_planInfo_node: ({ commit }, param) => commit("SET_PLANINFO_NODE", param),
  set_planInfo_type: ({ commit }, param) => commit("SET_PLANINFO_TYPE", param),
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
