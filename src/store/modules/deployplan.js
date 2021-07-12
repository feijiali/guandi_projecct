import api from "@/api/index";
var storageKey = "XMGJ_";
const state = {
    deployplan_node: sessionStorage.getItem(storageKey + "deployplan_node")
    ? JSON.parse(sessionStorage.getItem(storageKey + "deployplan_node"))
    : null,
    deployplan_type: localStorage.getItem(storageKey + "deployplan_type")
    ? JSON.parse(localStorage.getItem(storageKey + "deployplan_type"))
    : null,
};
const mutations = {
  SET_DEPLOYPLAN_NODE(state, payload) {
    state.deployplan_node = payload;
    sessionStorage.setItem(storageKey + "deployplan_node", payload);
  },
  SET_DEPLOYPLAN_TYPE(state, payload) {
    state.deployplan_type = payload;
    localStorage.setItem(storageKey + "deployplan_type", payload);
  },
};
const actions = {
  set_deployplan_node: ({ commit }, param) => commit("SET_DEPLOYPLAN_NODE", param),
  set_deployplan_type: ({ commit }, param) => commit("SET_DEPLOYPLAN_TYPE", param),
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
