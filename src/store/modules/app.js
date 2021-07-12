import api from '@/api/index';
var storageKey = 'XMGJ_';
const state = {
  organID: sessionStorage.getItem(storageKey + 'organ_id')
    ? JSON.parse(sessionStorage.getItem(storageKey + 'organ_id'))
    : 0,
  organ_rns_id: localStorage.getItem(storageKey + 'organ_rns_id')
    ? JSON.parse(localStorage.getItem(storageKey + 'organ_rns_id'))
    : 0,
  organProject: localStorage.getItem(storageKey + 'organProject')
    ? JSON.parse(localStorage.getItem(storageKey + 'organProject'))
    : [],
  projectId: JSON.parse(sessionStorage.getItem(storageKey + 'projectId'))
    ? JSON.parse(sessionStorage.getItem(storageKey + 'projectId'))
    : 0,
  rootOrganName: localStorage.getItem(storageKey + 'rootOrganName')
    ? localStorage.getItem(storageKey + 'rootOrganName')
    : '',
  projectName: sessionStorage.getItem(storageKey + 'projectName')
    ? sessionStorage.getItem(storageKey + 'projectName')
    : '',
  projectLogoUrl: localStorage.getItem(storageKey + 'projectLogoUrl')
    ? localStorage.getItem(storageKey + 'projectLogoUrl')
    : '',
  project_classify: localStorage.getItem(storageKey + 'project_classify')
    ? localStorage.getItem(storageKey + 'project_classify')
    : 0,
  organType: localStorage.getItem(storageKey + 'organType') ? localStorage.getItem(storageKey + 'organType') : '',
  rootOrganID: localStorage.getItem(storageKey + 'rootOrganID')
    ? JSON.parse(localStorage.getItem(storageKey + 'rootOrganID'))
    : 0,
  organTreeData: localStorage.getItem(storageKey + 'organTreeData')
    ? JSON.parse(localStorage.getItem(storageKey + 'organTreeData'))
    : [],
  subject: localStorage.getItem(storageKey + 'subject') ? JSON.parse(localStorage.getItem(storageKey + 'subject')) : [],
  subject_list: localStorage.getItem(storageKey + 'subject_list')
    ? JSON.parse(localStorage.getItem(storageKey + 'subject_list'))
    : [],
  subject_label: localStorage.getItem(storageKey + 'subject_label')
    ? localStorage.getItem(storageKey + 'subject_label')
    : [],
  isNoRead: localStorage.getItem(storageKey + 'isNoRead')
    ? Boolean(localStorage.getItem(storageKey + 'isNoRead'))
    : true,
  statement_info: localStorage.getItem(storageKey + 'statement_info')
    ? JSON.parse(localStorage.getItem(storageKey + 'statement_info'))
    : null,
  out_bound_info: localStorage.getItem(storageKey + 'out_bound_info')
    ? JSON.parse(localStorage.getItem(storageKey + 'out_bound_info'))
    : null,
  bim_select_organ: 0
};
const mutations = {
  SET_BIM_ORGAN(state, payload) {
    state.bim_select_organ = payload;
  },
  // 项目级的项目所在的组织架构的id
  SET_ORGANID(state, payload) {
    state.organID = payload;
    sessionStorage.setItem(storageKey + 'organ_id', payload);
  },
  //人员所在根节点
  SET_ROOTORGANID(state, payload) {
    state.rootOrganID = payload;
    localStorage.setItem(storageKey + 'rootOrganID', payload);
  },
  //人员所在根节点名字
  SET_ROOTORGANNAME(state, payload) {
    state.rootOrganName = payload;
    localStorage.setItem(storageKey + 'rootOrganName', payload);
  },
  // 根据顶部项目拿对应的组织结构
  SET_ORGAN_TREEDATA(state, payload) {
    state.organTreeData = payload;
    localStorage.setItem(storageKey + 'organTreeData', JSON.stringify(payload));
  },
  // 项目节点
  SET_SUBJECT(state, payload) {
    state.subject = payload;
    localStorage.setItem(storageKey + 'subject', JSON.stringify(payload));
  },
  // 项目节点
  SET_SUBJECT_LIST(state, payload) {
    state.subject_list = payload;
    localStorage.setItem(storageKey + 'subject_list', JSON.stringify(payload));
  },
  // 项目节点
  SET_SUBJECT_LABEL(state, payload) {
    state.subject_label = payload;
    localStorage.setItem(storageKey + 'subject_label', payload);
  },
  // 顶部消息已读未读
  SET_READ(state, payload) {
    state.isNoRead = payload;
    localStorage.setItem(storageKey + 'isNoRead', payload);
  },
  // 获取节点下的项目属性数据
  SET_ORGAN_PROJECT(state, payload) {
    state.organProject = payload;
    localStorage.setItem(storageKey + 'organProject', JSON.stringify(payload));
  },
  // 项目级的项目id
  SET_PROJECT_ID(state, payload) {
    state.projectId = payload;
    sessionStorage.setItem(storageKey + 'projectId', payload);
  },
  // 项目级的项目名字
  SET_PROJECT_NAME(state, payload) {
    state.projectName = payload;
    sessionStorage.setItem(storageKey + 'projectName', payload);
  },
  // 项目级的项目logo
  SET_PROJECT_LOGO(state, payload) {
    state.projectLogoUrl = payload;
    localStorage.setItem(storageKey + 'projectLogoUrl', payload);
  },
  // 项目级的项目类别-自营，合作
  SET_PROJECT_CLASSFY(state, payload) {
    state.project_classify = payload;
    localStorage.setItem(storageKey + 'project_classify', payload);
  },
  SET_LOGIN_ORGAN_TYPE(state, payload) {
    state.organ_type = payload;
    localStorage.setItem(storageKey + 'organType', payload);
  },
  SET_ORGAN_RNS_ID(state, payload) {
    state.organ_rns_id = payload;
    localStorage.setItem(storageKey + 'organ_rns_id', payload);
  },
  //对账单
  set_statement_info(state, payload) {
    state.statement_info = payload;
    localStorage.setItem(storageKey + 'statement_info', JSON.stringify(payload));
  },
  //出库信息提交表单
  set_out_bound_info(state, payload) {
    state.out_bound_info = payload;
    localStorage.setItem(storageKey + 'out_bound_info', JSON.stringify(payload));
  },
  // //清单管理节点
  // set_list_managr_orgin(state, payload) {
  //   state.list_managr_orgin = payload;
  //   console.log(payload)
  //   localStorage.setItem(storageKey + 'list_managr_orgin', JSON.stringify(payload));
  // }
};
const actions = {
  set_bim_organ: ({ commit }, param) => commit('SET_BIM_ORGAN', param),
  set_organ_project: ({ commit }, param) => commit('SET_ORGAN_PROJECT', param),
  set_project_id: ({ commit }, param) => commit('SET_PROJECT_ID', param),
  set_project_name: ({ commit }, param) => commit('SET_PROJECT_NAME', param),
  set_project_logo: ({ commit }, param) => commit('SET_PROJECT_LOGO', param),
  set_project_classify: ({ commit }, param) => commit('SET_PROJECT_CLASSFY', param),
  set_login_organ_type: ({ commit }, param) => commit('SET_LOGIN_ORGAN_TYPE', param),
  set_organ_rns_id: ({ commit }, param) => commit('SET_ORGAN_RNS_ID', param),
  set_subject: ({ commit }, param) => commit('SET_SUBJECT', param),
  set_subject_list: ({ commit }, param) => commit('SET_SUBJECT_LIST', param),
  set_rootorganName: ({ commit }, param) => commit('SET_ROOTORGANNAME', param),
  set_rootorganid: ({ commit }, param) => commit('SET_ROOTORGANID', param),
  set_organ_treedata: ({ commit }, param) => commit('SET_ORGAN_TREEDATA', param),
  set_organid: ({ commit }, param) => commit('SET_ORGANID', param),
  // list_managr_orgin: ({ commit }, param) => commit('set_list_managr_orgin', param),
  set_read({ commit }, param) {
    return new Promise((resolve, reject) => {
      api
        .queryMessageMsg({
          page: -2,
          account_id_union: param,
          msg_status: 1 //未读
        })
        .then(res => {
          commit('SET_READ', res.result.length === 0 ? true : false);
          //   resolve(res)
        })
        .catch(error => {
          //   reject(error)
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
