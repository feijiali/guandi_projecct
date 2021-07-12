/*
 * @Autor: 邓易
 * @Date: 2020-11-25 15:40:32
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-25 15:41:39
 */
import axios from "axios";
import { $encruption, $decryption, $encruption_realName } from "@/plugins/jssHttp";
import store from "../store";
import global from "@/plugins/global_varible.js";
let api = axios.create({
  timeout: 600000,
});
// 在全局请求和响应拦截器中添加请求状态
let loading = null;

//添加请求拦截器
api.interceptors.request.use(config => {
  let datas = config.data;
  // 将organ_node参数变成organ_nodes，并删除organ_node
  if (datas.hasOwnProperty('organ_node')) {
    if (!datas.noOrganNodes) { //noOrganNodes若为true,则用organ_node，取值为根节点
      datas.organ_nodes = String(datas.organ_node);
      delete datas.organ_node;
    } else {
      datas.organ_node = store.getters.rootOrganID;
    }
  }
  var token = "";
  const isLogin = config.url.includes("login");

  if (store.getters.token && !isLogin) {
    token = $encruption(`userid=${store.getters.token}&platform=2&dev=${global.browserInfo}`); // 请求头部添加token
  } else {
    token = $encruption(`platform=2&dev=${global.browserInfo}`); // 请求头部添加token
  }
  if (config.url.indexOf("DESIGN") != -1) {
    config.headers["Token-Cninct"] = $encruption(
      `userid=${store.getters.token}&platform=2&dev=${global.browserInfo}&token=3872e85d-0206-40f0-ac8d-35bbd6d59712`
    ); // 请求头部添加token
  } else {
    config.headers["Token-Cninct"] = token;
  }
  return config; //添加这一行
});
// 响应拦截器
api.interceptors.response.use(
  response => {
    if (loading) {
      loading.close();
    }
    if (response.config.url.indexOf("TryEncode") != -1) {
      response.data = JSON.parse(decryption(response.data));
    }
    if (response.config.headers.isSecret == "true") {
      response.data = JSON.parse(decryption(response.data));
    }
    return response.data;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

export default api;
