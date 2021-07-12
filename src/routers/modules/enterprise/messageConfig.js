export default [
  {
    path: "/enterprise/messageConfig",
    name: "enterprise_messageConfig",
    meta: {
      title: "消息配置",
      level: 0,
      notmenu: true,
      permission: ["MessageMsgConfig"],
    },
    component: () =>
      import(
        /* webpackChunkName: "backstage" */ "@/views/projects/messageConfig"
      ),
  },
  {
    path: "/enterprise/messageConfig/handle",
    name: "enterprise_messageConfig_handle",
    meta: {
      title: "消息配置",
      level: 0,
      notmenu: true,
      permission: ["MessageMsgConfig"],
    },
    component: () =>
      import(
        /* webpackChunkName: "backstage" */ "@/views/projects/messageConfig/handle"
      ),
  },
];
