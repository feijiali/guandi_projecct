import { ViewLayout } from '@/layouts';
export default [
  {
    path: "/project/engineering/monitoringMeasure",
    meta: {
      isProject: true,
      title: "监控量测",
      prolevel: 1,
      icon: "iconfont btn-icon_bim_tunnel_left",
      permission: ["SafeMonitorMeasure"],
    },
    name: "project_engineering_monitoringMeasure",
    component: ViewLayout,
    children: [
      {
        path: "/project/engineering/monitoringMeasure/analysis",
        meta: {
          isProject: true,
          title: "数据分析",
          prolevel: 2,
          permission: ["SafeMonitorMeasure"],
        },
        name: "project_engineering_monitoringMeasure_analysis",
        component: () =>
          import(/* webpackChunkname: "enterprise_engineering_monitoringMeasure" */ "@/views/enterprise/engineering/monitoringMeasure/analysis"),
      },
      {
        path: "/project/engineering/monitoringMeasure/statistical",
        meta: {
          isProject: true,
          title: "数据统计",
          prolevel: 2,
          permission: ["SafeMonitorMeasure"],
          // needAlive: true,
          // permission: ["SafeMonitorMeasure"],
        },
        name: "project_engineering_monitoringMeasure_statistical",
        component: () =>
          import(/* webpackChunkname: "enterprise_engineering_monitoringMeasure" */ "@/views/enterprise/engineering/monitoringMeasure/statistical"),
      },
      {
        path: "/project/engineering/monitoringMeasure/statistical/handle",
        meta: {
          isProject: true,
          title: "数据统计新增",
          select_path: '/project/engineering/monitoringMeasure/statistical',
        },
        name: "project_engineering_monitoringMeasure_statistical_handle",
        component: () =>
          import(/* webpackChunkname: "enterprise_engineering_monitoringMeasure" */ "@/views/enterprise/engineering/monitoringMeasure/statistical/handle"),
      },
    ],
  },
];
