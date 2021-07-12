import { SubmenuLayoutProject } from '@/layouts';
export default [{
  path: "/project/oa/accounts/performance",
  meta: {
    title: "绩效考核",
    prolevel: 2,
    needAlive: true,
    isProject: true,
    permission: ['PerformanceBasic'],
  },
  name: "project_oa_account_performance",
  component: SubmenuLayoutProject,
  children: [
    {
      path: "/project/oa/accounts/performance/sort",
      meta: {
        title: "智能排优",
        prolevel: 3,
        keepAlive: true,
        isProject: true,
        permission: ['PerformanceBasic'],
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_sort",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort"
        )
    },
    {
      path: "/project/oa/accounts/performance/sort/partsort",
      meta: {
        isProject: true,
        title: "智能排优",
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_sort_partsort",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/partsort"
        )
    },
    {
      path: "/project/oa/accounts/performance/sort/info",
      meta: {
        isProject: true,
        title: "智能排优详情",
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_sort_info",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/assessment/info"
        )
    },
    {
      path: "/project/oa/accounts/performance/sort/assessment",
      meta: {
        isProject: true,
        title: "绩效考核表",
        keepAlive: true,
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_sort_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/index"
        )
    },
    {
      path:
        "/project/oa/accounts/performance/sort/assessment/handle",
      meta: {
        isProject: true,
        title: "新增绩效考核",
        select_path: "/project/oa/accounts/performance"
      },
      name:
        "project_oa_account_performance_sort_assessment_handle",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/handle"
        )
    },
    {
      path: "/project/oa/accounts/performance/sort/assessment/info",
      meta: {
        isProject: true,
        title: "绩效考核详情",
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_sort_assessment_info",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/info"
        )
    },
    {
      path: "/project/oa/accounts/performance/assessment",
      meta: {
        title: "智能考核",
        prolevel: 3,
        keepAlive: true,
        isProject: true,
        permission: ['PerformanceBasic'],
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/assessment"
        )
    },
    {
      path: "/project/oa/accounts/performance/assessment/info",
      meta: {
        isProject: true,
        title: "智能考核",
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_assessment_info",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/assessment/info"
        )
    },
    {
      path: "/project/oa/accounts/performance/member",
      meta: {
        title: "成员考评",
        prolevel: 3,
        keepAlive: true,
        isProject: true,
        permission: ['PerformanceBasic'],
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_member",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/member"
        )
    },
    {
      path: "/project/oa/accounts/performance/member/assessment",
      meta: {
        isProject: true,
        title: "自我考评",
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_member_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/member/assessment"
        )
    },
    {
      path: "/project/oa/accounts/performance/mine",
      meta: {
        title: "自我考评",
        prolevel: 3,
        keepAlive: true,
        isProject: true,
        permission: ['PerformanceBasic'],
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_mine",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/mine"
        )
    },
    {
      path: "/project/oa/accounts/performance/mine/assessment",
      meta: {
        isProject: true,
        title: "自我考评",
        select_path: "/project/oa/accounts/performance"
      },
      name: "project_oa_account_performance_mine_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/mine/assessment"
        )
    }
  ]
},]