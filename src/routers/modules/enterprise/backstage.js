export default [
  {
    path: "/enterprise/backstage",
    name: "enterprise_backstage",
    meta: {
      title: "后台配置",
      level: 0,
      notmenu: true,
    },
    component: () => import(/* webpackChunkName: "backstage" */ "@/views/enterprise/backstage")
  },
  {
    path: "/enterprise/backstage/list",
    name: "enterprise_backstage_list",
    meta: {
      title: "后台配置",
      level: 0,
      notmenu: true,
    },
    component: () => import(/* webpackChunkName: "backstage" */ "@/views/enterprise/backstage/list.vue")
  },
  {
    path: "/enterprise/backstage/handle",
    name: "enterprise_backstage_handle",
    meta: {
      title: "后台配置",
      level: 0,
      notmenu: true,
    },
    component: () => import(/* webpackChunkName: "backstage" */ "@/views/enterprise/backstage/handle.vue")
  }
];
