/*
 * @Author: 郭海林
 * @Date: 2020-06-04 11:37:06
 * @LastEditors: 郭海林
 * @LastEditTime: 2020-06-04 16:53:28
 * @FilePath: \项目管家AI代码\src\routers\modules\projects\authority.js
 */

export default [
  {
    path: "/project/authority",
    name: "project_authority",
    meta: {
      title: "权限配置",
      prolevel: 0,
      isProject:true,
      permission: ['Authority'],
    },
    component: () =>
      import(/* webpackChunkName: "backstage" */ "@/views/projects/authority"),
  },
  {
    path: "/project/authority/handle",
    name: "project_authority_handle",
    meta: {
      title: "权限配置",
      prolevel: 0,
      isProject:true,
      permission: ['Authority'],
    },
    component: () =>
      import(
        /* webpackChunkName: "backstage" */ "@/views/projects/authority/handle"
      ),
  },
];
