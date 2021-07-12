import api from '@/api/index';
var storageKey = 'XMGJ_';
const state = {
    organProjectAccount: localStorage.getItem(storageKey + 'organProject')
        ? JSON.parse(localStorage.getItem(storageKey + 'organProject'))
        : [],
    organTreeDataAccount: localStorage.getItem(storageKey + 'organTreeData')
        ? JSON.parse(localStorage.getItem(storageKey + 'organTreeData'))
        : [],
    subjectAccount: localStorage.getItem(storageKey + 'subject') ? JSON.parse(localStorage.getItem(storageKey + 'subject')) : [],
    subject_listAccount: localStorage.getItem(storageKey + 'subject_list')
        ? JSON.parse(localStorage.getItem(storageKey + 'subject_list'))
        : [],
};
const mutations = {
    // 根据顶部项目拿对应的组织结构
    SET_ORGAN_TREEDATA(state, payload) {
        state.organTreeDataAccount = payload;
        localStorage.setItem(storageKey + 'organTreeDataAccount', JSON.stringify(payload));
    },
    // 项目节点
    SET_SUBJECT(state, payload) {
        state.subjectAccount = payload;
        localStorage.setItem(storageKey + 'subjectAccount', JSON.stringify(payload));
    },
    // 项目节点
    SET_SUBJECT_LIST(state, payload) {
        state.subject_listAccount = payload;
        localStorage.setItem(storageKey + 'subject_listAccount', JSON.stringify(payload));
    },
    // 获取节点下的项目属性数据
    SET_ORGAN_PROJECT(state, payload) {
        state.organProjectAccount = payload;
        localStorage.setItem(storageKey + 'organProjectAccount', JSON.stringify(payload));
    },
};
const actions = {
    set_organ_project: ({ commit }, param) => commit('SET_ORGAN_PROJECT', param),
    set_subject: ({ commit }, param) => commit('SET_SUBJECT', param),
    set_subject_list: ({ commit }, param) => commit('SET_SUBJECT_LIST', param),
    set_organ_treedata: ({ commit }, param) => commit('SET_ORGAN_TREEDATA', param),
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
