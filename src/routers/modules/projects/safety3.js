import { ViewLayout, SubmenuLayoutProject } from '@/layouts';
const isMixin = process.env.VUE_APP_MODE == "mixin" || process.env.VUE_APP_MODE == "mixin_dev" || process.env.VUE_APP_MODE == "guandi_dev";
export default [
  {
    path: '/project/safety3',
    meta: {
      title: '安全管理',
      prolevel: 1,
      isProject: true,
      icon: 'iconfont btn-icon_leftbar_safe',
      permission: ['securityManagementAbstract3']
    },
    name: 'project_safe',
    component: ViewLayout,
    children: [
      {
        path: '/project/safety3/safeManage/total',
        meta: {
          title: '安全汇总',
          prolevel: 2,
          isProject: true,
          permission: ['SafeTotal']
        },
        name: 'project_safety3_safeManage_total',
        component: () => import(/* webpackChunkname: "project_safety" */ '@/views/enterprise/safety3/safeManage/total')
      },
      {
        path: "/project/safety3/safeManage/video",
        meta: {
          title: "视频监控",
          prolevel: 2,
          isProject: true,
          permission: ['Video']
        },
        name: "project_safety3_safeManage_video",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video"),
      },
      {
        path: "/project/safety3/safeManage/video/videoManage",
        meta: {
          title: "摄像头管理",
          needAlive: true,
          isProject: true,
          select_path: '/project/safety3/safeManage/video',
          permission: ['Video']
        },
        name: "project_safety3_safeManage_video_videoManage",
        component: () =>
          import(
            /* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video/videoManage"
          ),
      },
      {
        path: "/project/safety3/safeManage/video/videoManage/handle",
        meta: {
          title: "摄像头管理新增",
          isProject: true,
          select_path: '/project/safety3/safeManage/video',
          permission: ['Video']
        },
        name: "project_safety3_safeManage_video_videoManage_handle",
        component: () =>
          import(
            /* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video/videoManage/handle"
          ),
      },
      {
        path: "/project/safety3/safeManage/video/capture",
        meta: {
          title: "智能抓拍",
          needAlive: true,
          isProject: true,
          select_path: '/project/safety3/safeManage/video'
        },
        name: "project_safety3_safeManage_video_capture",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/video/capture"),
      },
      // 

      //--------------------------------周界预警-----------------------------------
      {
        path: "/project/safety3/safeManage/safeWeekpolice",
        meta: {
          title: "周界预警",
          prolevel: 2,
          isProject: true,
          permission: ["Weekpolice"],
        },
        name: "project_safety3_safeManage_safeWeekpolice",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/safeWeekpolice"),
      },
      //--------------------------------用电检测-----------------------------------
      {
        path: "/project/safety3/safeManage/operation",
        meta: {
          title: "用电监测",
          prolevel: 2,
          isProject: true,
          permission: ['IoTLeakageProtectCaveat']
        },
        name: "project_safety3_safeManage_operation",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/operation"),
      },
      {
        path: "/project/safety3/safeManage/operation/acquisitionInfo",
        meta: {
          title: "运行监测预警详情",
          isProject: true,
          select_path: '/project/safety3/safeManage/operation'
        },
        name: "project_safety3_safeManage_operation_acquisitionInfo",
        component: () =>
          import(
            /* webpackChunkName: "enterprise_material" */ "@/views/enterprise/safety3/safeManage/operation/acquisitionInfo"
          ),
      },
      //--------------------------------气体监测-----------------------------------
      {
        path: "/project/safety3/safeManage/gasDetection",
        meta: {
          title: "气体监测",
          prolevel: 2,
          isProject: true,
          permission: ['GasDetectSensorRecord']
        },
        name: "project_safety3_safeManage_gasDetection",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/safeManage/gasDetection"),
      },
      {
        path: "/project/safety3/produceManage/safeEducation",
        meta: {
          title: "培训考核",
          prolevel: 2,
          isProject: true,
          permission: ['TrainingAssessment']
        },
        name: "project_safety3_produceManage_safeEducation",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/safeEducation/SafeEducation.vue"),
        // redirect: {
        //   name: "project_safety3_produceManage_safeEducation_preEducation"
        // },
        children: [
          //班前教育
          {
            path: "/project/safety3/produceManage/safeEducation/PreEducation",
            name: "project_safety3_produceManage_safeEducation_preEducation",
            meta: {
              isProject: true,
              select_path: "/project/safety3/produceManage/safeEducation",
              permission: ['SafeEducation'],
            },
            component: resolve =>
              require([
                "@/views/enterprise/safety3/produceManage/safeEducation/PreEducation.vue"
              ], resolve)
          },
          //安全考核
          {
            path: "/project/safety3/produceManage/safeEducation/SafeTest",
            name: "project_safety3_produceManage_safeEducation_SafeTest",
            meta: {
              isProject: true,
              select_path: "/project/safety3/produceManage/safeEducation",
              permission: ['SafeExamine'],
            },
            component: resolve =>
              require([
                "@/views/enterprise/safety3/produceManage/safeEducation/SafeTest.vue"
              ], resolve)
          },
          //安全交底
          {
            path: "/project/safety3/produceManage/safeEducation/SafeDisclosure",
            name: "project_safety3_produceManage_safeEducation_SafeDisclosure",
            meta: {
              isProject: true,
              select_path: "/project/safety3/produceManage/safeEducation",
              permission: ['SafeCommunicate'],
            },
            component: resolve =>
              require([
                "@/views/enterprise/safety3/produceManage/safeEducation/SafeDisclosure.vue"
              ], resolve)
          }
        ]
      },
      //新增班前教育
      {
        path: "/project/safety3/produceManage/safeEducation/HandlePreEducation",
        name: "project_safety3_produceManage_safeEducation_HandlePreEducation",
        meta: {
          isProject: true,
          select_path: "/project/safety3/produceManage/safeEducation",
        },
        component: resolve =>
          require([
            "@/views/enterprise/safety3/produceManage/safeEducation/HandlePreEducation.vue"
          ], resolve)
      },
      //新增安全考核
      {
        path: "/project/safety3/produceManage/safeEducation/HandleSafeTest",
        name: "project_safety3_produceManage_safeEducation_HandleSafeTest",
        meta: {
          isProject: true,
          select_path: "/project/safety3/produceManage/safeEducation",
        },
        component: resolve =>
          require([
            "@/views/enterprise/safety3/produceManage/safeEducation/HandleSafeTest.vue"
          ], resolve)
      },
      //新增安全交底
      {
        path: "/project/safety3/produceManage/safeEducation/HandleSafeDisclosure",
        name: "project_safety3_produceManage_safeEducation_HandleSafeDisclosure",
        meta: {
          isProject: true,
          select_path: "/project/safety3/produceManage/safeEducation",
        },
        component: resolve =>
          require([
            "@/views/enterprise/safety3/produceManage/safeEducation/HandleSafeDisclosure.vue"
          ], resolve)
      },
      //--------------------------------日常巡检-----------------------------------
      {
        path: "/project/safety3/produceManage/inspection",
        meta: {
          title: "日常巡检",
          prolevel: 2,
          isProject: true,
          permission: ["SafeDailyInspection"],
        },
        name: "project_safety3_produceManage_inspection",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/inspection"),
      },
      //新增日常巡检
      {
        path: "/project/safety3/produceManage/inspection/Handleinspection",
        name: "project_safety3_produceManage_inspection_Handleinspection",
        meta: {
          select_path: "/project/safety3/produceManage/inspection",
          isProject: true,
          permission: ["SafeDailyInspection"],
        },
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/inspection/handle.vue"),
      },
      //日常巡检整改与复检
      {
        path: "/project/safety3/produceManage/inspection/Reply",
        name: "project_safety3_produceManage_plan_Reply",
        meta: {
          select_path: "/project/safety3/produceManage/inspection",
          isProject: true,
        },
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/inspection/Reply.vue"),
      },
      //--------------------------------安全演练-----------------------------------
      {
        path: "/project/safety3/produceManage/security",
        meta: {
          title: "安全演练",
          prolevel: 2,
          isProject: true,
          permission: ["SafeDrill"],
        },
        name: "project_safety3_produceManage_security",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/security"),
      },
      //新增安全演练
      {
        path: "/project/safety3/produceManage/security/Handlesecurity",
        name: "project_safety3_produceManage_security_Handlesecurity",
        meta: {
          select_path: "/project/safety3/produceManage/security",
          isProject: true,
          permission: ["SafeDrill"],
        },
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/security/hanlde.vue"),
      },
      //新增年度计划
      {
        path: "/project/safety3/produceManage/plan/Handleplan",
        name: "project_safety3_produceManage_plan_Handleplan",
        meta: {
          select_path: "/project/safety3/produceManage/plan",
          isProject: true,
        },
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/plan/hanlde.vue"),
      },
      //--------------------------------年度计划-----------------------------------
      {
        path: "/project/safety3/produceManage/plan",
        meta: {
          title: "年度计划",
          prolevel: 2,
          isProject: true,
          permission: ["SafeAnnualPlan"],
        },
        name: "project_safety3_produceManage_plan",
        component: () =>
          import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/safety3/produceManage/plan"),
      },
    ]
  }
];
