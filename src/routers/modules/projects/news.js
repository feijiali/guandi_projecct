export default [
    {
      path: "/project/enternews",
      name: "project_enternews",
      meta: {
        title: "消息",
        prolevel:0,
        isProject: true,
        permission: ["MessageMsgConfig"],
      },
      component: () =>
        import(
          /* webpackChunkName: "project" */ "@/views/enterprise/enternews" 
        ),
    }
  ];