export default [
  {
    path: "/enterprise/enternews",
    name: "enterprise_enternews",
    meta: {
      title: "消息",
      level: 0,
      notmenu: true,
      keepAlive: true,
    },
    component: () =>
      import(/* webpackChunkName: "project" */ "@/views/enterprise/enternews"),
  },
];
