export default [
  {
    path: "/enterprise/summary",
    name: "enterprise_summary",
    meta: {
      title: "BI系统",
      level: 1,
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_summary" */ "@/views/enterprise/summary"
      )
  }
];
