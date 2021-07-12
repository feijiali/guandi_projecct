import { ViewLayout, SubmenuLayoutProject } from '@/layouts'
import performance from './oa/performance' //绩效考核
import attendance from './oa/attendance' //人员打卡1 --项目管家
import attendance2 from './oa/attendance2' //人员打卡  --十八局移植过来的
import move from './oa/move' //人员异动  --十八局移植过来的
import workbench from './oa/workbench' //工作台
import workbenchList from './oa/workbenchList' //工作台
import accounts from './oa/accounts' //管理人员
import labourRealName from './oa/labourRealName' //劳务人员
import salary from './oa/salary' //考勤工资
import email from './oa/email' // 电子邮箱
import infoResources from './oa/resource' // 资源
import document from './oa/document' // 公文管理
import announcements from './oa/announcements'
export default [
  {
    path: '/project/oa',
    meta: {
      title: 'OA管理',
      prolevel: 1,
      isProject: true,
      icon: 'iconfont btn-icon_leftbar_people',
      permission: ['oaManageAbstract']
    },
    name: 'project_oa_account',
    component: ViewLayout,
    children: [
      ...workbench,
      ...workbenchList,
      {
        path: '/project/oa/accounts',
        meta: {
          title: '人员管理',
          needAlive: true,
          prolevel: 2,
          isProject: true,
          permission: ['personnelManagement']
        },
        name: 'project_oa_account',
        component: SubmenuLayoutProject,
        children: [
          ...accounts,
          ...labourRealName,
          // ...attendance,
          ...attendance2,
          ...move,
          ...salary
        ]
      },
      ...performance,
      {
        path: '/project/oa/workPlan',
        name: 'project_oa_workbench_weekPlan',
        meta: {
          title: '工作计划',
          prolevel: 2,
          isProject: true,
          needAlive: true,
          icon: 'iconfont btn-icon_leftbar_test',
          permission: ['OAPlanWeek']
        },
        component: () =>
          import(
                        /* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/weekPlan'
          )
      },
      {
        path: '/project/oa/workbench/weekPlan/handle',
        meta: {
          title: '新增周计划',
          isProject: true,
          select_path: '/project/oa/workPlan'
        },
        name: 'project_oa_workbench_weekPlan_handle',
        component: () =>
          import(
                        /* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/weekPlan/handle'
          )
      },
      {
        path: '/project/oa/email',
        name: 'project_oa_email',
        meta: {
          title: '电子邮箱',
          prolevel: 2,
          isProject: true,
          needAlive: true,
          permission: ['OaEmail'],
          icon: 'iconfont btn-icon_topbar_message'
        },
        component: () =>
          import(/* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/oa/email'),
        redirect: { name: 'project_oa_email_write' },
        children: [...email]
      },
      {
        path: '/project/oa/infoResources',
        name: 'project_oa_infoResources',
        meta: {
          title: '信息资源',
          prolevel: 2,
          needAlive: true,
          permission: ['InformationResources'],
          icon: 'iconfont btn-icon_homepage_menu_10'
        },
        redirect: { name: 'project_oa_infoResources_informationList' },
        component: () =>
          import(
                        /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/infoResources'
          ),
        children: [...infoResources]
      },
      {
        path: '/project/oa/document',
        name: 'project_oa_document',
        meta: {
          title: '公文管理',
          prolevel: 2,
          needAlive: true,
          permission: ['ReceiveReceiveFile'],
          icon: 'iconfont btn-icon_homepage_menu_02'
        },
        component: () =>
          import(
                        /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/oa/document'
          ),
        redirect: { name: 'project_oa_document_write' },
        children: [...document]
      },
      {
        path: '/project/oa/announcements',
        name: 'project_oa_announcements',
        meta: {
          title: '通知公告',
          prolevel: 2,
          needAlive: true,
          permission: ['OaPublic'],
          icon: 'iconfont btn-icon_homepage_menu_22'
        },
        redirect: { name: 'project_oa_newAnnouncement' },
        component: () =>
          import(
                        /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/announcements'
          ),
        children: [...announcements]
      }
    ]
  }
]
