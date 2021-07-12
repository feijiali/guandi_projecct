/*
 * @Autor: 邓易
 * @Date: 2021-03-18 16:19:19
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-24 16:13:02
 */
export default [
  {
    path: "/project/summary",
    name: "project_summary",
    meta: {
      title: "首页",
      prolevel: 1,
      icon: "iconfont btn-icon_leftbar_home",
      isProject: true,
      // permission: ["BISystemProject"],
    },
    component: () => import(/* webpackChunkName: "project_summary" */ "@/views/projects/home2/index.vue"),
  },
  {
    path: "/project/homePic",
    name: "project_homePic",
    meta: {
      title: "图片资料",
      isProject: true,
      select_path: "/project/summary",
      permission: ["FilesSiteInfo"],
    },
    component: () => import(/* webpackChunkName: "project_summary" */ "@/views/projects/home2/homePic.vue"),
  },
];
