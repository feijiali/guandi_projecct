export default [
  {
    path: "/project/backstage",
    name: "project_backstage",
    meta:{
      title: "后台配置",
      prolevel:0,
      isProject: true,
    },
    component: () =>
      import(/* webpackChunkName: "backstage" */ "@/views/enterprise/backstage")
  },
  {
    path: "/project/backstage/list",
    name: "project_backstage_list",
    meta:{
      title: "后台配置",
      prolevel:0,
      isProject: true,
    },
    component: () =>
      import(/* webpackChunkName: "backstage" */ "@/views/enterprise/backstage/list.vue")
  },
  {
    path: "/project/backstage/handle",
    name: "project_backstage_handle",
    meta:{
      title: "后台配置",
      prolevel:0,
      isProject: true,
    },
    component: () =>
      import(/* webpackChunkName: "backstage" */ "@/views/enterprise/backstage/handle.vue")
  }
];
