export default [
  {
    path: "/enterprise/weeksetting",
    name: "enterprise_weeksetting",
    meta: {
      title: "周设置",
      level:0,
      notmenu:true,
      permission:['WeekManageSetUp'],
    },
    component: () =>
      import(
        /* webpackChunkName: "backstage" */ "@/views/projects/weeksetting"
      ),
  },
  {
    path: "/enterprise/weeksetting/handle",
    name: "enterprise_weeksetting_handle",
    meta: {
      title: "周设置新增",
      level: 0,
      notmenu: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "backstage" */ "@/views/projects/weeksetting/handle"
      ),
  },
];
