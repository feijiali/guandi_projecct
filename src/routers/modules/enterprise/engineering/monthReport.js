export default [
  {
    path: '/enterprise/engineering/monthReport',
    name: 'enterprise_engineering_monthReport',
    meta: {
      title: "联动月报表",
      level: 2,
      secondAlive: true,
      permission: ['ProjectInfoProjectLinkage'],
      icon: "iconfont btn-icon_leftbar_calculate",
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/engineering/monthReport"
      ),
  },
  {
    path: '/enterprise/engineering/monthReport/handle',
    name: 'enterprise_engineering_monthReport_handle',
    meta: {
      title: '联动月报表新增',
      select_path: '/enterprise/engineering/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/monthReport/handle'
      )
  },
  {
    path: '/enterprise/engineering/monthReport/prjApproval',
    name: 'enterprise_engineering_monthReport_prjApproval',
    meta: {
      title: '联动月报表审批',
      select_path: '/enterprise/engineering/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/monthReport/prjApproval'
      )
  },
  {
    path: '/enterprise/engineering/monthReport/detail',
    name: 'enterprise_engineering_monthReport_detail',
    meta: {
      title: '联动月报表详情',
      select_path: '/enterprise/engineering/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/monthReport/detail'
      )
  },
  {
    path: '/enterprise/engineering/monthReport/addHeader',
    name: 'enterprise_engineering_monthReport_addHeader',
    meta: {
      title: '添加表头',
      select_path: '/enterprise/engineering/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/monthReport/addHeader'
      )
  },
  {
    path: '/enterprise/engineering/monthReport/addProject',
    name: 'enterprise_engineering_monthReport_addProject',
    meta: {
      title: '添加工程项目',
      select_path: '/enterprise/engineering/monthReport'
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/monthReport/addProject'
      )
  },
];
