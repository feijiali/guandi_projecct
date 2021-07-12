import { MenuLayout, ViewLayout, SubmenuLayout } from '@/layouts';
export default [
  {
    path: "/enterprise/engineering/monitoringMeasure",
    meta: {
      title: "监控量测",
      level: 2,
      icon: "iconfont btn-icon_bim_tunnel_left",
      permission: ["SafeMonitorMeasure"],
    },
    name: "enterprise_engineering_monitoringMeasure",
    component: ViewLayout,
    children: [
      {
        path: "/enterprise/engineering/monitoringMeasure/analysis",
        meta: {
          title: "数据分析",
          level: 3,
          permission: ["SafeMonitorMeasure"],
          // needAlive: true,
        },
        name: "enterprise_engineering_monitoringMeasure_analysis",
        component: () =>
          import(/* webpackChunkname: "enterprise_engineering_monitoringMeasure" */ "@/views/enterprise/engineering/monitoringMeasure/analysis"),
      },
      {
        path: "/enterprise/engineering/monitoringMeasure/statistical",
        meta: {
          title: "数据统计",
          level: 3,
          permission: ["SafeMonitorMeasure"],
          // needAlive: true,
        },
        name: "enterprise_engineering_monitoringMeasure_statistical",
        component: () =>
          import(/* webpackChunkname: "enterprise_engineering_monitoringMeasure" */ "@/views/enterprise/engineering/monitoringMeasure/statistical"),
      },
      {
        path: "/enterprise/engineering/monitoringMeasure/statistical/handle",
        meta: {
          title: "数据统计新增",
          select_path: '/enterprise/engineering/monitoringMeasure/statistical',
        },
        name: "enterprise_engineering_monitoringMeasure_statistical_handle",
        component: () =>
          import(/* webpackChunkname: "enterprise_engineering_monitoringMeasure" */ "@/views/enterprise/engineering/monitoringMeasure/statistical/handle"),
      },
    ],
  },
];
