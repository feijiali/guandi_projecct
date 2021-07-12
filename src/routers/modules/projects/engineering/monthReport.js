export default [
  {
    path: '/project/monthReport',
    name: 'project_engineering_monthReport',
    meta: {
      title: "联动月报表",
      isProject: true,
      needAlive: true,
      prolevel: 1,
      permission: ['ProjectInfoProjectLinkage'],
      icon: "iconfont btn-icon_leftbar_calculate",
    },
    component: () =>
      import(
        /* webpackChunkName: "project_engineering" */ "@/views/enterprise/engineering/monthReport"
      ),
  },
  {
    path: '/project/monthReport/handle',
    name: 'project_engineering_monthReport_handle',
    meta: {
      title: '联动月报表新增',
      isProject: true,
      select_path: '/project/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/monthReport/handle'
      )
  },
  {
    path: '/project/monthReport/prjApproval',
    name: 'project_engineering_monthReport_prjApproval',
    meta: {
      title: '联动月报表审批',
      isProject: true,
      select_path: '/project/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/monthReport/prjApproval'
      )
  },
  {
    path: '/project/monthReport/detail',
    name: 'project_engineering_monthReport_detail',
    meta: {
      title: '联动月报表详情',
      isProject: true,
      select_path: '/project/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/monthReport/detail'
      )
  },
  {
    path: '/project/monthReport/addHeader',
    name: 'project_engineering_monthReport_addHeader',
    meta: {
      title: '添加表头',
      isProject: true,
      select_path: '/project/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/monthReport/addHeader'
      )
  },
  {
    path: '/project/monthReport/addProject',
    name: 'project_engineering_monthReport_addProject',
    meta: {
      title: '添加工程项目',
      isProject: true,
      select_path: '/project/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/monthReport/addProject'
      )
  },
];
