export default [
  {
    path: "/project/approval",
    name: "project_approval",
    meta: {
      title: "审批配置",
      prolevel: 0,
      isProject:true,
      permission: ['ApproveProcess'],
    },
    component: () =>
      import(
        /* webpackChunkName: "project" */ "@/views/enterprise/approval/index"
      ),
  },
  {
    path: "/project/approval/handle",
    name: "project_approval_handle",
    meta: {
      title: "审批配置",
      prolevel:0,
      isProject:true,
    },
    component: () =>
      import(
        /* webpackChunkName: "project" */ "@/views/enterprise/approval/handle"
      ),
  },
];
