import { MenuLayout, ViewLayout, SubmenuLayout } from "@/layouts";
export default [
  {
    path: "/enterprise/safety3",
    name: "enterprise_safe3",
    meta: {
      title: "安全管理",
      level: 1,
      permission: ['securityManagementAbstract3']
    },
    component: MenuLayout,
    redirect: { name: "enterprise_oa_system" },
    children: [
      {
        path: "/enterprise/safety3/safeManage/total",
        meta: {
          title: "安全汇总",
          level: 2,
          icon: "iconfont btn-icon_topbar_menu",
          permission: ['SafeTotal']
        },
        name: "enterprise_safe3_safeManage_total",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/total"),
      },
      {
        path: "/enterprise/safety3/safeManage",
        meta: {
          title: "动态管理",
          level: 2,
          icon: "iconfont btn-icon_leftbar_safe",
          permission: ['Video', 'IoTLeakageProtectCaveat', 'GasDetectSensorRecord']
        },
        name: "enterprise_safe3_safeManage",
        component: ViewLayout,
        children: [
          //--------------------------------视频监控-----------------------------------
          {
            path: "/enterprise/safety3/safeManage/video",
            meta: {
              title: "视频监控",
              level: 3,
              permission: ['Video']
            },
            name: "enterprise_safety3_safeManage_video",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video"),
          },
          {
            path: "/enterprise/safety3/safeManage/video/videoManage",
            meta: {
              title: "摄像头管理",
              select_path: "/enterprise/safety3/safeManage/video",
              needAlive: true,
            },
            name: "enterprise_safety3_safeManage_video_videoManage",
            component: () =>
              import(
                /* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video/videoManage"
              ),
          },
          {
            path: "/enterprise/safety3/safeManage/video/videoManage/handle",
            meta: {
              title: "摄像头管理新增",
              select_path: "/enterprise/safety3/safeManage/video",
            },
            name: "enterprise_safety3_safeManage_video_videoManage_handle",
            component: () =>
              import(
                /* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video/videoManage/handle"
              ),
          },
          {
            path: "/enterprise/safety3/safeManage/video/capture",
            meta: {
              title: "智能抓拍",
              select_path: "/enterprise/safety3/safeManage/video",
              needAlive: true,
            },
            name: "enterprise_safety3_safeManage_video_capture",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video/capture"),
          },
          // 

          //--------------------------------周界预警-----------------------------------
          {
            path: "/enterprise/safety3/safeManage/safeWeekpolice",
            meta: {
              title: "周界预警",
              select_path: "/enterprise/safety3/safeManage/safeWeekpolice",
              level: 3,
              permission: ['Weekpolice']
            },
            name: "enterprise_safety3_safeManage_safeWeekpolice",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/safeWeekpolice"),
          },
          //--------------------------------用电检测-----------------------------------
          {
            path: "/enterprise/safety3/safeManage/operation",
            meta: {
              title: "用电监测",
              select_path: "/enterprise/safety3/safeManage/operation",
              level: 3,
              permission: ['IoTLeakageProtectCaveat']
            },
            name: "enterprise_safety3_safeManage_operation",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/operation"),
          },
          {
            path: "/enterprise/safety3/safeManage/operation/acquisitionInfo",
            meta: {
              title: "运行监测预警详情",
              select_path: "/enterprise/safety3/safeManage/safeWeekpolice",
            },
            name: "enterprise_safety3_safeManage_operation_acquisitionInfo",
            component: () =>
              import(
                /* webpackChunkName: "enterprise_material" */ "@/views/enterprise/safety3/safeManage/operation/acquisitionInfo"
              ),
          },
          //--------------------------------气体监测-----------------------------------
          {
            path: "/enterprise/safety3/safeManage/gasDetection",
            meta: {
              title: "气体监测",
              select_path: "/enterprise/safety3/safeManage/gasDetection",
              level: 3,
              permission: ['GasDetectSensorRecord']
            },
            name: "enterprise_safety3_safeManage_gasDetection",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/gasDetection"),
          },
        ]
      },
      {
        path: "/enterprise/safety3/produceManage",
        meta: {
          title: "生产管理",
          level: 2,
          icon: "iconfont btn-icon_leftbar_book",
          permission: ['ProductionManagement']
        },
        name: "enterprise_safe3_produceManage",
        component: ViewLayout,
        children: [
          //--------------------------------培训考核-----------------------------------
          {
            path: "/enterprise/safety3/produceManage/safeEducation",
            meta: {
              title: "培训考核",
              level: 3,
              permission: ['TrainingAssessment']
            },
            name: "enterprise_safety3_produceManage_safeEducation",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/safeEducation/SafeEducation"),
            // redirect: {
            //   name: "enterprise_safety3_produceManage_safeEducation_preEducation"
            // },
            children: [
              //班前教育
              {
                path: "/enterprise/safety3/produceManage/safeEducation/PreEducation",
                name: "enterprise_safety3_produceManage_safeEducation_preEducation",
                meta: {
                  select_path: "/enterprise/safety3/produceManage/safeEducation",
                  permission: ['SafeEducation'],
                },
                component: resolve =>
                  require([
                    "@/views/enterprise/safety3/produceManage/safeEducation/PreEducation"
                  ], resolve)
              },
              //安全考核
              {
                path: "/enterprise/safety3/produceManage/safeEducation/SafeTest",
                name: "enterprise_safety3_produceManage_safeEducation_SafeTest",
                meta: {
                  select_path: "/enterprise/safety3/produceManage/safeEducation",
                  permission: ['SafeExamine'],
                },
                component: resolve =>
                  require([
                    "@/views/enterprise/safety3/produceManage/safeEducation/SafeTest"
                  ], resolve)
              },
              //安全交底
              {
                path: "/enterprise/safety3/produceManage/safeEducation/SafeDisclosure",
                name: "enterprise_safety3_produceManage_safeEducation_SafeDisclosure",
                meta: {
                  select_path: "/enterprise/safety3/produceManage/safeEducation",
                  permission: ['SafeCommunicate'],
                },
                component: resolve =>
                  require([
                    "@/views/enterprise/safety3/produceManage/safeEducation/SafeDisclosure"
                  ], resolve)
              }
            ]
          },
          //新增班前教育
          {
            path: "/enterprise/safety3/produceManage/safeEducation/HandlePreEducation",
            name: "enterprise_safety3_produceManage_safeEducation_HandlePreEducation",
            meta: {
              select_path: "/enterprise/safety3/produceManage/safeEducation",
            },
            component: resolve =>
              require([
                "@/views/enterprise/safety3/produceManage/safeEducation/HandlePreEducation"
              ], resolve)
          },
          //新增安全考核
          {
            path: "/enterprise/safety3/produceManage/safeEducation/HandleSafeTest",
            name: "enterprise_safety3_produceManage_safeEducation_HandleSafeTest",
            meta: {
              select_path: "/enterprise/safety3/produceManage/safeEducation",
            },
            component: resolve =>
              require([
                "@/views/enterprise/safety3/produceManage/safeEducation/HandleSafeTest"
              ], resolve)
          },
          //新增安全交底
          {
            path: "/enterprise/safety3/produceManage/safeEducation/HandleSafeDisclosure",
            name: "enterprise_safety3_produceManage_safeEducation_HandleSafeDisclosure",
            meta: {
              select_path: "/enterprise/safety3/produceManage/safeEducation",
            },
            component: resolve =>
              require([
                "@/views/enterprise/safety3/produceManage/safeEducation/HandleSafeDisclosure"
              ], resolve)
          },
          //--------------------------------日常巡检-----------------------------------
          {
            path: "/enterprise/safety3/produceManage/inspection",
            meta: {
              title: "日常巡检",
              level: 3,
              needAlive: true,
              permission: ["SafeDailyInspection"],
            },
            name: "enterprise_safety3_produceManage_inspection",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/inspection"),
          },
          //新增日常巡检
          {
            path: "/enterprise/safety3/produceManage/inspection/Handleinspection",
            name: "enterprise_safety3_produceManage_inspection_Handleinspection",
            meta: {
              select_path: "/enterprise/safety3/produceManage/inspection",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/inspection/handle"),
          },
          //日常巡检整改与复检
          {
            path: "/views/enterprise/safety3/produceManage/inspection/Reply",
            name: "enterprise_safety3_produceManage_plan_Reply",
            meta: {
              select_path: "/enterprise/safety3/produceManage/inspection",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/inspection/Reply"),
          },
          //--------------------------------安全演练-----------------------------------
          {
            path: "/enterprise/safety3/produceManage/security",
            meta: {
              title: "安全演练",
              level: 3,
              needAlive: true,
              permission: ["SafeDrill"],
            },
            name: "enterprise_safety3_produceManage_security",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/security"),
          },
          //新增安全演练
          {
            path: "/enterprise/safety3/produceManage/security/Handlesecurity",
            name: "enterprise_safety3_produceManage_security_Handlesecurity",
            meta: {
              select_path: "/enterprise/safety3/produceManage/security",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/security/hanlde"),
          },
          //新增年度计划
          {
            path: "/enterprise/safety3/produceManage/plan/Handleplan",
            name: "enterprise_safety3_produceManage_plan_Handleplan",
            meta: {
              select_path: "/enterprise/safety3/produceManage/plan",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/plan/hanlde"),
          },
          //--------------------------------年度计划-----------------------------------
          {
            path: "/enterprise/safety3/produceManage/plan",
            meta: {
              title: "年度计划",
              level: 3,
              needAlive: true,
              permission: ["SafeAnnualPlan"],
            },
            name: "enterprise_safety3_produceManage_plan",
            component: () =>
              import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/plan"),
          },
        ]
      }
    ]
  }
]