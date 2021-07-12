export default [{
    path: '/project/oa/workbench',
    name: 'project_oa_workbench',
    meta: {
      title: '工作台',
      prolevel: 2,
      isProject: true,
      icon: 'iconfont btn-icon_leftbar_home'
    },
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench')
  },
  {
    path: "/project/oa/workbench/applyList",
    meta: {
      title: "申请管理",
      isProject: true,
      select_path: "/project/oa/workbench",
    },
    name: "project_oa_workbench_applyList",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/applyList"),
  },
  {
    path: '/project/oa/workbench/commission',
    meta: {
      title: '我的代办',
      isProject: true,
      needAlive: true,
      select_path: '/project/oa/workbench'
    },
    name: 'project_oa_workbench_commission',
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/commission')
  },
  {
    path: '/project/oa/workbench/cancelLeave',
    meta: {
      title: '销假',
      isProject: true,
      select_path: '/project/oa/workbench'
    },
    name: 'project_oa_workbench_cancelLeave',
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/cancelLeave')
  },
  {
    path: '/project/oa/workbench/info',
    meta: {
      title: '详情',
      isProject: true,
      permission: ['OAManageOA'],
      select_path: '/project/oa/workbench'
    },
    name: 'project_oa_workbench_info',
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/info')
  },
  {
    path: '/project/oa/workbench/apply',
    meta: {
      title: '我的申请',
      isProject: true,
      select_path: '/project/oa/workbench'
    },
    name: 'project_oa_workbench_apply',
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/apply')
  },

  {
    path: '/project/oa/workbench/approval',
    meta: {
      title: '审批',
      isProject: true,
      permission: ['OAManageOA'],
      select_path: '/project/oa/workbench'
    },
    name: 'project_oa_workbench_approval',
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/approval')
  },
  {
    path: '/project/oa/workbench/copy',
    meta: {
      title: '抄送',
      isProject: true,
      permission: ['OAManageOA'],
      select_path: '/project/oa/workbench'
    },
    name: 'project_oa_workbench_copy',
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/copy')
  },

];