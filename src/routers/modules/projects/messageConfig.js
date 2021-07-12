export default [
  {
    path: "/project/messageConfig",
    name: "project_messageConfig",
    meta: {
      title: "消息配置",
      prolevel: 0,
      isProject:true,
      permission: ["MessageMsgConfig"],
    },
    component: () =>
      import(
        /* webpackChunkName: "backstage" */ "@/views/projects/messageConfig"
      ),
  },
  {
    path: "/project/messageConfig/handle",
    name: "project_messageConfig_handle",
    meta: {
      title: "消息配置",
      prolevel: 0,
      isProject:true,
      permission: ["MessageMsgConfig"],
    },
    component: () =>
      import(
        /* webpackChunkName: "backstage" */ "@/views/projects/messageConfig/handle"
      ),
  },
];
