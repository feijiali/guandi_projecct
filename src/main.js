/*
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:55
 * @LastEditors: 邓易
 * @LastEditTime: 2021-01-06 14:14:37
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
// 权限
import vPermission from "./directive/permission.js"; // 引入指令
Vue.directive("permission", vPermission);

import { $organ_id_en_or_pro } from "@/plugins/oranID";
Vue.prototype.$organ_id_en_or_pro = $organ_id_en_or_pro;

// element
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/element-variables.scss";
import "./assets/css/element.scss";
Vue.use(ElementUI);

import { uploadFile, postRequest } from "@/api/axios";
Vue.prototype.uploadFile = uploadFile;
Vue.prototype.postRequest = postRequest;
import globalConponents from "@/components/common/index.js"; //注册自定义的场景组件
import tools from "./plugins/tools.js"; // 全局引入公共方法
Vue.prototype.$utils = tools;
Vue.config.productionTip = false;
Vue.use(globalConponents);
Vue.filter("formatDate", tools.formatDate);
import global from "./plugins/global_varible.js"; // 引入全局变量
Vue.prototype.GLOBAL = global;

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
});
// 中央事件
Vue.prototype.$bus = new Vue();

//打印
import Print from "vue-print-nb";
Vue.use(Print);

import animate from "animate.css";
Vue.use(animate);

import { Base64 } from "js-base64";
Vue.prototype.Base64 = {
  encode: Base64.encode,
  decode: Base64.decode,
};
window.vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount("#app");
