var storageKey = 'XMGJ_'
const state = {
    // 工程列表
    projectList: sessionStorage.getItem(storageKey + 'project_list')
        ? JSON.parse(sessionStorage.getItem(storageKey + 'project_list'))
        : [],
    // 项目部列表
    partmentList: sessionStorage.getItem(storageKey + 'partment_list')
        ? JSON.parse(sessionStorage.getItem(storageKey + 'partment_list'))
        : [],
    // 设备信息
    deviceInfo: sessionStorage.getItem(storageKey + 'device_info')
        ? JSON.parse(sessionStorage.getItem(storageKey + 'device_info'))
        : null,
    // 材料信息
    receptAndSendInfo: sessionStorage.getItem(storageKey + 'recept_and_send_info')
        ? JSON.parse(sessionStorage.getItem(storageKey + 'recept_and_send_info'))
        : null,
    selectProjectId: sessionStorage.getItem(storageKey + 'select_project_id')
        ? JSON.parse(sessionStorage.getItem(storageKey + 'select_project_id'))
        : ''
}
const mutations = {
    SET_PROJECT_LIST(state, payload) {
        state.projectList = payload
        sessionStorage.setItem(storageKey + 'project_list', JSON.stringify(payload))
    },
    SET_PARTMENT_LIST(state, payload) {
        state.partmentList = payload
        sessionStorage.setItem(storageKey + 'partment_list', JSON.stringify(payload))
    },
    SET_DEVICE_INFO(state, payload) {
        state.deviceInfo = payload
        sessionStorage.setItem(storageKey + 'device_info', JSON.stringify(payload))
    },
    SET_RECEPT_AND_SEND_INFO(state, payload) {
        state.receptAndSendInfo = payload
        sessionStorage.setItem(storageKey + 'recept_and_send_info', JSON.stringify(payload))
    },
    SET_PROJECT_ID(state, payload) {
        state.selectProjectId = payload
        sessionStorage.setItem(storageKey + 'select_project_id', JSON.stringify(payload))
    }
}
export default {
    namespaced: true,
    state,
    mutations
}
