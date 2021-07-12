/*
 * @Autor: 邓易
 * @Date: 2021-03-03 09:16:37
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-04 16:38:26
 */
import store from "@/store";
import { hasPermissionArr } from "../plugins/permission_tools.js";
const permission = {
  // 指令已经添加到元素上，el-指令相关dom元素；binding-对象
  // binding: {name:'if', expression:'foo==1', value: true}
  // v-permission="['admin','editor']"
  inserted(el, binding) {
    // 获取指令的值：按钮要求的角色数组
    // 结构value并取别名pRoles
    const { value: permission } = binding;
    // 获取用户角色
    // const permissionList = store.getters && store.getters.permissionList;

    if (permission) {
      // 判断用户角色中是否有按钮要求的角色
      const hasPermission = hasPermissionArr(permission);
      // 如果没有权限则删除当前dom
      if (!hasPermission) {
        el.classList.add("d-none");
        el.style.display = "none";
      }
    } else {
      throw new Error(`需要指定，如v-permission="['modify']`);
    }
  },
};

export default permission;
