export default [
    {
      path: "/project/weeksetting",
      name: "project_weeksetting",
      meta: {
        title: "周设置",
        prolevel: 0,
        isProject:true,
        permission: ["WeekManageSetUp"],
      },
      component: () =>
        import(
          /* webpackChunkName: "weeksetting" */ "@/views/projects/weeksetting"
        ),
    },
    {
      path: "/project/weeksetting/handle",
      name: "project_weeksetting_handle",
      meta: {
        title: "周设置新增",
        prolevel: 0,
        isProject:true,
        permission: ["WeekManageSetUp"],
      },
      component: () =>
        import(
          /* webpackChunkName: "weeksetting" */ "@/views/projects/weeksetting/handle"
        ),
    },
  ];
  