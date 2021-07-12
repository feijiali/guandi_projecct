export default [
  {
    path: "/enterprise/authority",
    name: "enterprise_authority",
    meta: {
      title: "权限配置",
      level: 0,
      notmenu: true,
      permission: ['Authority'],
    },
    component: () =>
      import(/* webpackChunkName: "backstage" */ "@/views/projects/authority")
  },
  {
    path: "/enterprise/authority/handle",
    name: "enterprise_authority_handle",
    meta: {
      title: "权限配置",
      level: 0,
      notmenu: true,
      permission: ['Authority'],
    },
    component: () =>
      import(/* webpackChunkName: "backstage" */ "@/views/projects/authority/handle")
  },
]
