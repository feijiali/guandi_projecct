var storageKey = "XMGJ_";

const state = {
  routes: [],
  addRoutes: [],
  menuData: localStorage.getItem(storageKey+"xm_menu") ? JSON.parse(localStorage.getItem(storageKey+"xm_menu")) : [],
  subMenuData: localStorage.getItem(storageKey+"xm_sub_menu") ? JSON.parse(localStorage.getItem(storageKey+"xm_sub_menu")) : []
};
const mutations = {
  SET_ROUTES(state, payload) {
    state.routes = [...payload];
    state.addRoutes = payload;
  },
  SET_MENU_DATA: (state, menu) => {
    state.menuData = menu;
    localStorage.setItem(storageKey+"xm_menu", JSON.stringify(menu));
  },
  SET_SUB_MENU_DATA: (state, menu) => {
    state.subMenuData = menu;
    localStorage.setItem(storageKey+"xm_sub_menu", JSON.stringify(menu));
  }
};

const actions = {
  // 动态添加主界面路由，需要缓存
  UpdateAppRouter({ commit }, routes) {
    return new Promise(resolve => {
      //const [ roles ] = routes.constRoutes
      let routelist = routes.constRoutes;
      commit("SET_ROUTES", routelist);
      resolve();
    });
  },
  SET_MENU_DATA({ commit }, menu) {
    commit("SET_MENU_DATA", menu);
  },
  SET_SUB_MENU_DATA({ commit }, menu) {
    commit("SET_SUB_MENU_DATA", menu);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
