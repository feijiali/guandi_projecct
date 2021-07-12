import { SubmenuLayout } from "@/layouts";
export default [{
  path: "/enterprise/oa/accounts/performance",
  meta: {
    title: "绩效考核",
    level: 3,
    needAlive: true,
    permission: ['PerformanceBasic'],
  },
  name: "enterprise_oa_account_performance",
  component: SubmenuLayout,
  children: [
    {
      path: "/enterprise/oa/accounts/performance/sort",
      meta: {
        title: "智能排优",
        level: 4,
        keepAlive: true,
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_sort",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/sort/partsort",
      meta: {
        title: "智能排优",
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_sort_partsort",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/partsort"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/sort/info",
      meta: {
        title: "智能排优详情",
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_sort_info",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/assessment/info"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/sort/assessment",
      meta: {
        title: "绩效考核表",
        keepAlive: true,
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_sort_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/index"
        )
    },
    {
      path:
        "/enterprise/oa/accounts/performance/sort/assessment/handle",
      meta: {
        title: "新增绩效考核",
        select_path: "/enterprise/oa/accounts/performance"
      },
      name:
        "enterprise_oa_account_performance_sort_assessment_handle",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/handle"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/sort/assessment/info",
      meta: {
        title: "绩效考核详情",
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_sort_assessment_info",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/sort/assessment/info"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/assessment",
      meta: {
        title: "智能考核",
        level: 4,
        keepAlive: true,
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/assessment"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/assessment/info",
      meta: {
        title: "智能考核",
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_assessment_info",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/assessment/info"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/member",
      meta: {
        title: "成员考评",
        level: 4,
        keepAlive: true,
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_member",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/member"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/member/assessment",
      meta: {
        title: "自我考评",
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_member_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/member/assessment"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/mine",
      meta: {
        title: "自我考评",
        level: 4,
        keepAlive: true,
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_mine",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/mine"
        )
    },
    {
      path: "/enterprise/oa/accounts/performance/mine/assessment",
      meta: {
        title: "自我考评",
        select_path: "/enterprise/oa/accounts/performance"
      },
      name: "enterprise_oa_account_performance_mine_assessment",
      component: () =>
        import(
  /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/performance/mine/assessment"
        )
    }
  ]
},]