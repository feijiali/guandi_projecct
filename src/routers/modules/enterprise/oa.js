import { MenuLayout, ViewLayout, SubmenuLayout } from "@/layouts";
import performance from "./oa/performance"; //绩效考核
import attendance from "./oa/attendance"; //人员打卡1 --项目管家
import attendance2 from "./oa/attendance2"; //人员打卡  --十八局移植过来的
import workbench from "./oa/workbench"; //工作台
import workbenchList from "./oa/workbenchList"; //工作台
import accounts from "./oa/accounts"; //管理人员
import labourRealName from "./oa/labourRealName"; //劳务人员
import salary from "./oa/salary"; //考勤工资

export default [
  {
    path: "/enterprise/oa",
    name: "enterprise_oa",
    meta: {
      title: "OA管理",
      level: 1,
      permission: ["oaManageAbstract"],
    },
    component: MenuLayout,
    children: [
      ...workbench,
      ...workbenchList,
      {
        path: "/enterprise/oa/accounts",
        meta: {
          title: "人员管理",
          level: 2,
          permission: ["personnelManagement"],
          icon: "iconfont btn-icon_leftbar_people",
        },
        name: "enterprise_oa_account",
        component: ViewLayout,
        children: [
          ...accounts,
          ...labourRealName,
          // ...attendance,
          ...attendance2,
          ...salary,
          ...performance
        ]
      },
      {
        path: "/enterprise/oa/workPlan",
        name: "enterprise_oa_workbench_weekPlan",
        meta: {
          title: "工作计划",
          level: 2,
          secondAlive: true,
          permission: ["OAPlanWeek"],
          icon: "iconfont btn-icon_leftbar_test",
        },
        component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/weekPlan"),
      },
      {
        path: "/enterprise/oa/workbench/weekPlan/handle",
        meta: {
          title: "新增周计划",
          select_path: "/enterprise/oa/workPlan",
        },
        name: "enterprise_oa_workbench_weekPlan_handle",
        component: () =>
          import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/weekPlan/handle"),
      },
      {
        path: "/enterprise/oa/email",
        name: "enterprise_oa_email",
        meta: {
          title: "电子邮箱",
          level: 2,
          permission: ["OaEmail"],
          noChildren: true,
          icon: "iconfont btn-icon_topbar_message",
        },
        component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email"),
        redirect: { name: "enterprise_oa_email_write" },
        children: [
          {
            path: "/enterprise/oa/email/write",
            name: "enterprise_oa_email_write",
            meta: {
              title: "写邮件",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/write"),
          },
          {
            path: "/enterprise/oa/email/reply",
            name: "enterprise_oa_email_write_reply",
            meta: {
              title: "回复",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/write"),
          },
          {
            path: "/enterprise/oa/email/forwarding",
            name: "enterprise_oa_email_write_forwarding",
            meta: {
              title: "转发",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/write"),
          },

          {
            path: "/enterprise/oa/email/inbox",
            name: "enterprise_oa_email_inbox",
            meta: {
              title: "收件箱",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/inbox"),
          },
          {
            path: "/enterprise/oa/email/inbox/reply",
            name: "enterprise_oa_email_inbox_reply",
            meta: {
              title: "收件箱回复",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/inbox/reply"),
          },
          {
            path: "/enterprise/oa/email/inbox/forwarding",
            name: "enterprise_oa_email_inbox_forwarding",
            meta: {
              title: "收件箱转发",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/inbox/forwarding"),
          },
          {
            path: "/enterprise/oa/email/inbox/info",
            name: "enterprise_oa_email_inbox_info",
            meta: {
              title: "收件箱详情",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/inbox/info"),
          },
          {
            path: "/enterprise/oa/email/sented",
            name: "enterprise_oa_email_sented",
            meta: {
              title: "已发送",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/sented"),
          },
          {
            path: "/enterprise/oa/email/sented/reply",
            name: "enterprise_oa_email_sented_reply",
            meta: {
              title: "已发送再次编辑",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/sented/reply"),
          },
          {
            path: "/enterprise/oa/email/sented/forwarding",
            name: "enterprise_oa_email_sented_forwarding",
            meta: {
              title: "已发送转发",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/sented/forwarding"),
          },
          {
            path: "/enterprise/oa/email/sented/info",
            name: "enterprise_oa_email_sented_info",
            meta: {
              title: "已发送详情",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/sented/info"),
          },
          {
            path: "/enterprise/oa/email/stars",
            name: "enterprise_oa_email_stars",
            meta: {
              title: "星标件",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/stars"),
          },
          {
            path: "/enterprise/oa/email/stars/forwarding",
            name: "enterprise_oa_email_stars_forwarding",
            meta: {
              title: "星标件转发",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/stars/forwarding"),
          },
          {
            path: "/enterprise/oa/email/stars/info",
            name: "enterprise_oa_email_stars_info",
            meta: {
              title: "星标件详情",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/stars/info"),
          },
          {
            path: "/enterprise/oa/email/drafts",
            name: "enterprise_oa_email_drafts",
            meta: {
              title: "草稿箱",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/drafts"),
          },
          {
            path: "/enterprise/oa/email/drafts/reply",
            name: "enterprise_oa_email_drafts_info",
            meta: {
              title: "草稿箱详情",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/drafts/reply"),
          },
          {
            path: "/enterprise/oa/email/dustbin",
            name: "enterprise_oa_email_dustbin",
            meta: {
              title: "垃圾箱",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/dustbin"),
          },
          {
            path: "/enterprise/oa/email/dustbin/reply",
            name: "enterprise_oa_email_dustbin_reply",
            meta: {
              title: "垃圾箱再次编辑",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/dustbin/reply"),
          },
          {
            path: "/enterprise/oa/email/dustbin/forwarding",
            name: "enterprise_oa_email_dustbin_forwarding",
            meta: {
              title: "垃圾箱转发",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/dustbin/forwarding"),
          },
          {
            path: "/enterprise/oa/email/dustbin/info",
            name: "enterprise_oa_email_dustbin_info",
            meta: {
              title: "垃圾箱详情",
              select_path: "/enterprise/oa/email",
              // permission: ["OAAllocation"],
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/email/dustbin/info"),
          },
        ],
      },

      {
        path: "/enterprise/oa/infoResources",
        name: "enterprise_oa_infoResources",
        meta: {
          title: "信息资源",
          level: 2,
          noChildren: true,
          secondAlive: true,
          permission: ["InformationResources"],
          icon: "iconfont btn-icon_homepage_menu_10",
        },
        redirect: { name: "enterprise_oa_infoResources_informationList" },
        component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/infoResources"),
        children: [
          {
            path: "/enterprise/oa/infoResources/informationList",
            name: "enterprise_oa_infoResources_informationList",
            meta: {
              title: "信息资源列表",
              needAlive: true,
              // permission: ['OAInvoiceShare'],
              select_path: "/enterprise/oa/infoResources",
            },
            component: () =>
              import(
                /* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/infoResources/informationList"
              ),
          },
          {
            path: "/enterprise/oa/infoResources/newHolder",
            name: "enterprise_oa_infoResources_newHolder",
            meta: {
              title: "新增文件夹",
              // needAlive: true,
              // permission: ['OAInvoiceShare'],
              select_path: "/enterprise/oa/infoResources",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/infoResources/newHolder"),
          },
          {
            path: "/enterprise/oa/infoResources/flieAttribute",
            name: "enterprise_oa_infoResources_flieAttribute",
            meta: {
              title: "文件属性",
              // needAlive: true,
              // permission: ['OAInvoiceShare'],
              select_path: "/enterprise/oa/infoResources",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/infoResources/flieAttribute"),
          },
          {
            path: "/enterprise/oa/infoResources/log",
            name: "enterprise_oa_infoResources_log",
            meta: {
              title: "文件日志",
              // needAlive: true,
              // permission: ['OAInvoiceShare'],
              select_path: "/enterprise/oa/infoResources",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/infoResources/log"),
          },
        ],
      },

      {
        path: "/enterprise/oa/document",
        name: "enterprise_oa_document",
        meta: {
          title: "公文管理",
          level: 2,
          permission: ["ReceiveReceiveFile"],
          noChildren: true,
          icon: "iconfont btn-icon_homepage_menu_02",
        },
        component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document"),
        redirect: { name: "enterprise_oa_document_write" },
        children: [
          {
            path: "/enterprise/oa/document/write",
            name: "enterprise_oa_document_write",
            meta: {
              title: "发文拟稿",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/write"),
          },
          {
            path: "/enterprise/oa/document/draft",
            name: "enterprise_oa_document_draft",
            meta: {
              title: "草稿箱",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/draft"),
          },
          {
            path: "/enterprise/oa/document/draft/edit",
            name: "enterprise_oa_document_draft_edit",
            meta: {
              title: "草稿箱编辑",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/draft/edit"),
          },
          {
            path: "/enterprise/oa/document/myPost",
            name: "enterprise_oa_document_myPost",
            meta: {
              title: "我的发文",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/myPost"),
          },
          {
            path: "/enterprise/oa/document/myPost/info",
            name: "enterprise_oa_document_myPost_info",
            meta: {
              title: "我的发文详情",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/myPost/info"),
          },
          {
            path: "/enterprise/oa/document/myPost/undo",
            name: "enterprise_oa_document_myPost_undo",
            meta: {
              title: "我的发文撤销",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/myPost/undo"),
          },
          {
            path: "/enterprise/oa/document/myPost/edit",
            name: "enterprise_oa_document_myPost_edit",
            meta: {
              title: "我的发文编辑",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/myPost/edit"),
          },
          {
            path: "/enterprise/oa/document/commission",
            name: "enterprise_oa_document_commission",
            meta: {
              title: "待办发文",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/commission"),
          },
          {
            path: "/enterprise/oa/document/commission/info",
            name: "enterprise_oa_document_commission_info",
            meta: {
              title: "待办发文详情",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/commission/info"),
          },
          {
            path: "/enterprise/oa/document/done",
            name: "enterprise_oa_document_done",
            meta: {
              title: "已办发文",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/done"),
          },
          {
            path: "/enterprise/oa/document/done/info",
            name: "enterprise_oa_document_done_info",
            meta: {
              title: "已办发文详情",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/done/info"),
          },
          {
            path: "/enterprise/oa/document/addressee",
            name: "enterprise_oa_document_addressee",
            meta: {
              title: "我的收文",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/addressee"),
          },
          {
            path: "/enterprise/oa/document/addressee/info",
            name: "enterprise_oa_document_addressee_info",
            meta: {
              title: "我的收文详情",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/addressee/info"),
          },
          {
            path: "/enterprise/oa/document/addressee/reply",
            name: "enterprise_oa_document_addressee_reply",
            meta: {
              title: "我的收文回复",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/addressee/reply"),
          },
          {
            path: "/enterprise/oa/document/monitor",
            name: "enterprise_oa_document_monitor",
            meta: {
              title: "公文监控",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/monitor"),
          },
          {
            path: "/enterprise/oa/document/monitor/info",
            name: "enterprise_oa_document_monitor_info",
            meta: {
              title: "公文监控详情",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/monitor/info"),
          },
          {
            path: "/enterprise/oa/document/monitor/reply_detail",
            name: "enterprise_oa_document_monitor_reply_detail",
            meta: {
              title: "处理人回复",
              select_path: "/enterprise/oa/document",
              icon: "iconfont btn-icon_leftbar_information",
            },
            component: () =>
              import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/document/monitor/reply_detail"),
          },
        ],
      },

      {
        path: "/enterprise/oa/announcements",
        name: "enterprise_oa_announcements",
        meta: {
          title: "通知公告",
          level: 2,
          noChildren: true,
          // secondAlive: true,
          permission: ["OaPublic"],
          icon: "iconfont btn-icon_homepage_menu_22",
        },
        redirect: { name: "enterprise_oa_newAnnouncement" },
        component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/announcements"),
        children: [
          {
            path: "/enterprise/oa/newAnnouncement",
            name: "enterprise_oa_newAnnouncement",
            meta: {
              title: "公告发布",
              // permission: ['OAInvoiceShare'],
              select_path: "/enterprise/oa/announcements",
            },
            component: () =>
              import(
                /* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/announcements/newAnnouncement"
              ),
          },
          {
            path: "/enterprise/oa/allAnnouncement",
            name: "enterprise_oa_allAnnouncement",
            meta: {
              title: "全部公告",
              // needAlive: true,
              // permission: ['OAInvoiceShare'],
              select_path: "/enterprise/oa/announcements",
            },
            component: () =>
              import(
                /* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/announcements/allAnnouncement"
              ),
          },
          {
            path: "/enterprise/oa/announcementDetails",
            name: "enterprise_oa_announcementDetails",
            meta: {
              title: "公告详情",
              needAlive: true,
              // permission: ['OAInvoiceShare'],
              select_path: "/enterprise/oa/announcements",
            },
            component: () =>
              import(
                /* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/announcements/announcementDetails"
              ),
          },
        ],
      },
    ],
  },
];
