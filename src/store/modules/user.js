import api from "@/api/index";
var storageKey = "XMGJ_";

const state = {
  account_project_role: localStorage.getItem(storageKey + "account_project_role")
    ? localStorage.getItem(storageKey + "account_project_role")
    : 0,
  token: localStorage.getItem(storageKey + "token") ? localStorage.getItem(storageKey + "token") : "", // 认证凭证'
  userName: localStorage.getItem(storageKey + "userName") || "",
  account_tel: localStorage.getItem(storageKey + "account_tel") || "",
  account_id_card: localStorage.getItem(storageKey + "account_id_card") || "",
  account_sex: localStorage.getItem(storageKey + "account_sex") || "",
  account_job: localStorage.getItem(storageKey + "account_job") || "",
  account_sign: localStorage.getItem(storageKey + "account_sign") || "",
  account_sign_name: localStorage.getItem(storageKey + "account_sign_name") || "",
  account_character_type: parseInt(localStorage.getItem(storageKey + "account_character_type")) || null,
  account_range_type: parseInt(localStorage.getItem(storageKey + "account_range_type")) || null,
  avatar: localStorage.getItem(storageKey + "avatar") || "",
  account_id: localStorage.getItem(storageKey + "account_id") || 0,
  staff_status: localStorage.getItem(storageKey + "staff_status") || 0,
  roles: [],
  permissionList: sessionStorage.getItem(storageKey + "permissionList")
    ? sessionStorage.getItem(storageKey + "permissionList").split(",")
    : [],
  account_range_type: localStorage.getItem(storageKey + "account_range_type") || "",
  user_organ_id: parseInt(localStorage.getItem(storageKey + "user_organ_id")) || 0,
  user_organ_name: localStorage.getItem(storageKey + "user_organ_name") || "",
  account_project_ids: localStorage.getItem(storageKey + "account_project_ids") || "",
  organ_type: parseInt(localStorage.getItem(storageKey + "organ_type")) || null,
  organ_child_node: localStorage.getItem(storageKey + "organ_child_node") || "",
  user_project: parseInt(localStorage.getItem(storageKey + "user_project")) || null,
  user_enterprise: parseInt(localStorage.getItem(storageKey + "user_enterprise")) || null,
  account_password_is_default: parseInt(localStorage.getItem(storageKey + "account_password_is_default")) || null,
};
const mutations = {
  SET_USERID(state, token) {
    state.token = token;
  },
  SET_NAME(state, name) {
    state.userName = name;
    localStorage.setItem(storageKey + "userName", name);
  },
  SET_USER_RANGE_TYPE(state, type) {
    state.account_range_type = type;
    localStorage.setItem(storageKey + "account_range_type", name);
  },
  SET_ACCOUNT_TELL(state, tel) {
    state.account_tel = tel;
    localStorage.setItem(storageKey + "account_tel", tel);
  },
  SET_ACCOUNT_ID_CARD(state, account_id_card) {
    state.account_id_card = account_id_card;
    localStorage.setItem(storageKey + "account_id_card", account_id_card);
  },
  SET_ACCOUNT_SEX(state, tel) {
    state.account_sex = tel;
    localStorage.setItem(storageKey + "account_sex", tel);
  },
  SET_ACCOUNT_JOB(state, job) {
    state.account_job = job;
    localStorage.setItem(storageKey + "account_job", job);
  },
  SET_ACCOUNT_SIGN(state, sign) {
    state.account_sign = sign;
    localStorage.setItem(storageKey + "account_sign", sign);
  },
  SET_ACCOUNT_SIGN_NAME(state, name) {
    state.account_sign_name = name;
    localStorage.setItem(storageKey + "account_sign_name", name);
  },
  SET_ACCOUNT_CHARACTER_TYPE(state, name) {
    state.account_character_type = name;
    localStorage.setItem(storageKey + "account_character_type", name);
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar;
    localStorage.setItem(storageKey + "avatar", avatar);
  },
  SET_USER_ORGAN_ID(state, id) {
    state.user_organ_id = id;
    localStorage.setItem(storageKey + "user_organ_id", id);
  },
  SET_USER_ORGAN_NAME(state, name) {
    state.user_organ_name = name;
    localStorage.setItem(storageKey + "user_organ_name", name);
  },
  // 设置用户所在的项目 
  SET_ACCOUNT_PROJECT_IDS(state, id) {
    state.account_project_ids = id;
    localStorage.setItem(storageKey + "account_project_ids", id);
  },
  SET_ACCOUNT(state, account_id) {
    state.account_id = account_id;
    localStorage.setItem(storageKey + "account_id", account_id);
  },
  SET_ROLE(state, account_project_role) {
    state.account_project_role = account_project_role;
    localStorage.setItem(storageKey + "account_project_role", account_project_role);
  },
  SET_STAFFSRATUS(state, staff_status) {
    state.staff_status = staff_status; //staff_status
    localStorage.setItem(storageKey + "staff_status", staff_status);
    // state.staff_status = 2 //staff_status
    // localStorage.setItem('staff_status', 2)
  },
  DEL_TOKEN(state) {
    state.token = "";
    state.roles = "";
    localStorage.removeItem(storageKey + "token");
  },
  SET_ROLES(state, payload) {
    state.roles = payload;
  },
  SET_PERMISSIONLIST: (state, permissionList) => {
    state.permissionList = permissionList;
    sessionStorage.setItem(storageKey + "permissionList", permissionList);
  },
  SET_USER_ORGAN_TYPE: (state, organ_type) => {
    state.organ_type = organ_type;
    localStorage.setItem(storageKey + "organ_type", organ_type);
  },
  SET_ORGAN_CHILD_NODE: (state, organ_child_node) => {
    state.organ_child_node = organ_child_node;
    localStorage.setItem(storageKey + "organ_child_node", organ_child_node);
  },
  SET_USER_PROJECT: (state, user_project) => {
    state.user_project = user_project;
    localStorage.setItem(storageKey + "user_project", user_project);
  },
  SET_USER_ENTERPRISE: (state, user_enterprise) => {
    state.user_enterprise = user_enterprise;
    localStorage.setItem(storageKey + "user_enterprise", user_enterprise);
  },
  SET_ACCOUNT_PASSWORD_IS_DEFAULT: (state, account_password_is_default) => {
    state.account_password_is_default = account_password_is_default;
    localStorage.setItem(storageKey + "account_password_is_default", account_password_is_default);
  },
  // 保存用户角色
  SET_ACCOUNT_CHARACER_TYPE: (state, account_character_type) => {
    state.account_character_type = account_character_type;
    localStorage.setItem(storageKey + "account_character_type", account_character_type);
  },
  // 保存用户应用范围
  SET_ACCOUNT_RANGE_TYPE: (state, account_range_type) => {
    state.account_range_type = account_range_type;
    localStorage.setItem(storageKey + "account_range_type", account_range_type);
  },
};
const actions = {
  set_account_sign: ({ commit }, param) => commit("SET_ACCOUNT_SIGN", param),
  set_account_sign_name: ({ commit }, param) => commit("SET_ACCOUNT_SIGN_NAME", param),
  set_account_character_type: ({ commit }, param) => commit("SET_ACCOUNT_CHARACTER_TYPE", param),
  set_user_project: ({ commit }, param) => commit("SET_USER_PROJECT", param),
  set_user_enterprise: ({ commit }, param) => commit("SET_USER_ENTERPRISE", param),
  set_account_password_is_default: ({ commit }, param) => commit("SET_ACCOUNT_PASSWORD_IS_DEFAULT", param),
  set_account_characer_type: ({ commit }, param) => commit("SET_ACCOUNT_CHARACER_TYPE", param),
  set_account_range_type: ({ commit }, param) => commit("SET_ACCOUNT_RANGE_TYPE", param),
  set_acount_project_ids: ({ commit }, param) => commit("SET_ACCOUNT_PROJECT_IDS", param),
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      api
        .userLogin(formdatas)
        .then(res => {
          let arr = res.result[0].organ_child_node.split(",");
          arr.splice(0, 1);
          let organ_child_node = arr.join(",");
          commit("SET_USERID", res.result[0].userid);
          commit("SET_NAME", res.result[0].account_name);
          commit("SET_ACCOUNT_TELL", res.result[0].account);
          commit("SET_ACCOUNT_ID_CARD", res.result[0].account_id_card);
          commit("SET_ACCOUNT_SEX", res.result[0].account_sex);
          commit("SET_ACCOUNT_JOB", res.result[0].account_job);
          commit("SET_ACCOUNT_SIGN", res.result[0].account_sign);
          commit("SET_AVATAR", res.result[0].url);
          commit("SET_ACCOUNT", res.result[0].account_id);
          commit("SET_ROLE", res.result[0].account_project_role);
          commit("SET_STAFFSRATUS", res.result[0].staff_status);
          commit("SET_USER_ORGAN_ID", res.result[0].organ_id);
          commit("SET_USER_ORGAN_NAME", res.result[0].organ);
          commit("SET_ACCOUNT_PROJECT_IDS", res.result[0].account_project_ids);
          commit("SET_USER_ORGAN_TYPE", res.result[0].organ_type);
          commit("SET_USER_RANGE_TYPE", res.result[0]);
          commit("SET_ORGAN_CHILD_NODE", organ_child_node);
          localStorage.setItem(storageKey + "token", res.result[0].userid);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  loginOut({ commit }) {
    commit("DEL_TOKEN");
    commit("SET_PERMISSIONLIST", []);
    localStorage.clear();
  },
  // 获取用户权限
  GetPermissionList({ commit, state }, datas) {
    return new Promise((resolve, reject) => {
      api
        .queryFullAction({
          account_id: parseInt(state.account_id),
          relation_organ_ids: datas ? String(datas.id) : "",
        })
        .then(res => {
          let arrs = [];
          let parentStr = "";
          res.result.forEach(item => {
            let moudule = item.module_parent_eng;
            let arr = item.action_list.map(item => moudule + "-" + item);
            arr.push(moudule);
            if (item.action_detail_list && item.action_detail_list.length > 0) {
              parentStr = item.action_detail_list[0].relation_upper.split(",");
              parentStr = parentStr.slice(0, parentStr.length - 1);
              arr.push(...parentStr);
            }
            if (item.action_invisible_detail_list && item.action_invisible_detail_list.length > 0) {
              arr = [];
            }
            arrs = [...arrs, ...arr];
          });
          arrs = Array.from(new Set(arrs));
          commit("SET_PERMISSIONLIST", arrs);
          setTimeout(resolve(), 0);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取用户角色
  GetRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      api
        .queryRole({
          role_accounts: "" + state.account_id,
        })
        .then(res => {
          resolve();
        });
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
