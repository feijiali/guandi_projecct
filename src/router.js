/*
 * @Autor: 邓易
 * @Date: 2021-02-06 16:27:12
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-27 17:46:57
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { constantRouterMap } from "./routers";
Vue.use(VueRouter);
// import Vue from "vue";
// import VueRouter from "vue-router";
// import Routes from "./modules/index.js";
import { Base64 } from "js-base64";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 解决 Navigating to current location 的问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
VueRouter.prototype.goBack = function (ind = -1) {
  this.isBack = true;
  this.go(ind);
};
VueRouter.prototype.linkTo = function (name, query) {
  let length = window.vm.$route.matched.length - 1;
  if (window.vm.$route.matched[length].meta && window.vm.$route.matched[length].meta.isProject) {
    name = name.replace("enterprise", "project");
  }
  let option = {
    name: name,
  };
  if (query) {
    if (query.id) {
      query.id = Base64.encode(query.id);
    }
    option.query = query;
  }
  this.push(option);
};
VueRouter.prototype.replaceTo = function (name, query) {
  let length = window.vm.$route.matched.length - 1;
  if (window.vm.$route.matched[length].meta && window.vm.$route.matched[length].meta.isProject) {
    name = name.replace("enterprise", "project");
  }
  let option = {
    name: name,
  };
  if (query) {
    if (query.id) {
      query.id = Base64.encode(query.id);
    }
    option.query = query;
  }
  this.replace(option);
};

const RouterModel = new VueRouter({
  mode: "hash",
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [...constantRouterMap],
});
RouterModel.beforeEach(async (to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  // if (store.getters.permissionList.length === 0) {
  //   await store.dispatch('user/GetPermissionList')
  // }
  if (RouterModel.isBack) {
    RouterModel.transType = "1";
    RouterModel.isBack = false;
  } else {
    RouterModel.transType = "0";
  }

  const token = store.getters.token;
  // localStorage.getItem('XMGJ_user_project') &&
  if (!store.getters.user_enterprise && to.path.includes("enterprise")) {
    //说明此人是项目级的，就不能进入企业级
    next("/project");
  } else {
    next();
  }
});
RouterModel.afterEach(() => {
  window.scrollTo(0, 0);
  NProgress.done();
});
export default RouterModel;
