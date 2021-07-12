export default [
  {
    path: "/enterprise/approval",
    name: "enterprise_approval",
    meta: {
      title: "审批配置",
      icon: "iconfont icon-oa",
      level:0,
      notmenu:true,
      permission: ['ApproveProcess'],
    },
    component: () =>
      import(
        /* webpackChunkName: "project" */ "@/views/enterprise/approval/index"
      ),
  },
  {
    path: "/enterprise/approval/handle",
    name: "enterprise_approval_handle",
    meta: {
      title: "审批配置",
      icon: "iconfont icon-oa",
      level:0,
      notmenu:true,
      permission: ['ApproveProcess'],
    },
    component: () =>
      import(
        /* webpackChunkName: "project" */ "@/views/enterprise/approval/handle"
      ),
  },
];
