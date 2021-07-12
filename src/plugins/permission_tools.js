/**
 * 权限配置工具
 */
// import { asyncRoutes } from '../routers'
import store from "@/store";
/**
 * 生成路由
 */
export const generateAllRouter = asyncRoutes => {
  let indexRouter = [
    {
      path: "/project",
      component: () => import("@/layouts/project/BasicLayout.vue"),
      children: [
        {
          path: "/project/home",
          name: "project_summary",
          meta: {
            name: "首  页",
            icon: "",
          },
          component: () => import("@/views/projects/home2/index.vue"),
        },
        ...generateRouters(asyncRoutes),
        {
          path: "/404",
          name: "error_404",
          component: () => import("@/views/error-page/404.vue"),
        },
      ],
    },
  ];
  return indexRouter;
};
export const generateRouters = data => {
  let routers = [];
  for (var item of data) {
    // 当用户拥有当前页面权限的权限时，copy并处理到新的数组中
    let menu = {
      path: item.path,
      name: item.name,
      redirect: item.redirect,
      component: item.component,
      //component:()=> import(`@/views/${item.component}.vue`),
      meta: item.meta,
    };
    // 当存在子路由时，递归添加路由
    if (item.children && item.children.length > 0) {
      // 修改路由的重定向
      menu.redirect = createRedirectFn(item.redirect, item.children);
      // 递归子路由
      menu.children = [...generateRouters(item.children)];
    }
    routers.push(menu);
  }
  return routers;
};
/**
 *
 * @param {Array} arr 数组中是否有一种权限存在
 */
export const hasPermissionArr = arr => {
  if (arr && arr.length > 0) {
    return arr.some(item => {
      return hasPermission(item);
    });
  } else {
    return true;
  }
};
/**
 * 是否存在当前权限
 * @param {String} name 权限名称
 */
export const hasPermission = name => {
  // 测试环境权限全开，测试的时候注释
  // if (process.env.NODE_ENV === "development") {
  //   return true;
  // }
  // //混合项目权限全开
  // if (process.env.VUE_APP_MODE.indexOf("guandi") != -1) {  store.state.user.account_project_role == 1
  //   return true;
  // }
  if (store.getters.staff_status == 2) {
    return true;
    //联动月报表根据角色权限限制可见不可见
  } else if (name == "ProjectInfoProjectLinkage") {
    if (store.state.user.account_project_role == 1 || store.state.user.account_project_role == 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return store.getters.permissionList.includes(name);
  }
};
/**
 * 根据权限过滤对象数组
 * @param {Array} arr 对象数组
 * @param {String} name 权限key
 */
export const hasPermissionMenu = (arr, name) => {
  return arr.filter(item => {
    if (!item[name]) {
      return true;
    } else {
      return hasPermissionArr(item[name]);
    }
  });
};

function createRedirectFn(redirect = {}, children = []) {
  // 避免缓存太大，只保留 children 的 name 和 permissions
  const permissionChildren = children.map(({ name = "", meta: { permission = [] } = {} }) => ({ name, permission }));
  return function (to) {
    // 这里一定不能在 return 的函数外面筛选，因为权限是异步获取的
    const hasPermissionChildren = permissionChildren.filter(item => hasPermissionArr(item.permission));
    // 默认填写的重定向的 name
    const defaultName = redirect.name || "";
    // 如果默认重定向没有权限，则从 children 中选择第一个有权限的路由做重定向
    const firstPermissionName = (hasPermissionChildren[0] || { name: "" }).name;
    // 判断是否需要修改默认的重定向
    const saveDefaultName = !!hasPermissionChildren.find(item => item.name === defaultName && defaultName);
    if (saveDefaultName) {
      return { name: defaultName };
    } else {
      return firstPermissionName ? { name: firstPermissionName } : redirect;
    }
  };
}
