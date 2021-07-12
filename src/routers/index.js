//  引入企业级的路由
import enterprise from "./modules/enterprise";
//  引入项目级的路由
import project from "./modules/projects";
export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: resolve => require(["@/views/login.vue"], resolve),
  },
  ...enterprise,
  ...project,
  {
    path: "/401",
    name: "error_401",
    component: () => import("@/views/error-page/401.vue"),
  },
  {
    path: "/500",
    name: "error_500",
    component: () => import("@/views/error-page/500.vue"),
  },
  {
    path: "/404",
    name: "error_404",
    component: () => import("@/views/error-page/404.vue"),
  },
  {
    path: "/",
    redirect: "/enterprise/summary",
  },
  {
    path: "/enterprise",
    redirect: "/enterprise/summary",
  },
  {
    path: "*",
    redirect: "/404",
  },
];
