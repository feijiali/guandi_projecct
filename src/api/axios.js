/*
 * @Autor: 邓易
 * @Date: 2020-10-21 10:49:39
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-03 14:46:01
 */
import service from "../plugins/request";
import $C from "@/common/config";
import router from "../router";
import { Message } from "element-ui"; // 引用element-ui的加载和消息提示组件
let baseUrl = $C.baseUrl + "?op=";
export const postRequest = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    service
      .post(url, data)
      .then(res => {
        if (res.state == 0) {
          resolve(res.ext);
        } else {
          if (res.state == 5) {
            window.vm.$tip({
              isTip: true,
              message: `登录状态信息过期，请重新登录`,
            });
            setTimeout(function () {
              if (router.currentRoute.name != "login") {
                router.push({
                  path: "/login",
                  query: {
                    redirect: router.currentRoute.name,
                  },
                });
              }
            }, 1500);
            // router.push("/login");
          } else {
            if (router.currentRoute.name == "login") {
              reject(res.ext);
            }
            window.vm.$tip({
              isTip: true,
              message: res.message,
            });
          }
          // reject(res);
        }
      })
      .catch(res => {
        window.vm.$tip({
          isTip: true,
          message: `网络似乎出了点小差错，请重试`,
        });
        reject(res);
      });
  });
};
export const uploadFile = (fileList, obj, url, callback) => {
  return new Promise((resolve, reject) => {
    let FD = new FormData();
    for (let value of fileList) {
      FD.append("uploadFile", value);
    }
    for (let key in obj) {
      FD.append(key, obj[key]);
    }
    service({
      url: baseUrl + (url ? url : "UploadFileModule"),
      method: "post",
      data: FD,
      onUploadProgress: res => callback && callback(res),
    })
      .then(res => {
        if (res.state == 0) {
          resolve(res.ext);
        } else {
          Message({
            showClose: true,
            message: res.message,
            type: "error",
          });
          reject(res);
        }
      })
      .catch(res => {
        Message({
          showClose: true,
          message: "网络似乎出了点小差错，请重试",
          type: "error",
        });
        reject(res);
      });
  });
};
