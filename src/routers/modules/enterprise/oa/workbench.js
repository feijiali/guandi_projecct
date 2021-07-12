export default [{
    path: "/enterprise/oa/workbench",
    name: "enterprise_oa_workbench",
    meta: {
        title: "工作台",
        level: 2,
        icon: "iconfont btn-icon_leftbar_home",
    },
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench"),
},
{
    path: "/enterprise/oa/workbench/applyList",
    meta: {
        title: "申请管理",
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_applyList",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/applyList"),
},
{
    path: "/enterprise/oa/workbench/commission",
    meta: {
        title: "我的代办",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_commission",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/commission"),
},
{
    path: "/enterprise/oa/workbench/cancelLeave",
    meta: {
        title: "销假",
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_cancelLeave",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/cancelLeave"),
},
{
    path: "/enterprise/oa/workbench/info",
    meta: {
        title: "详情",
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_info",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/info"),
},
{
    path: "/enterprise/oa/workbench/apply",
    meta: {
        title: "我的申请",
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_apply",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/apply"),
},
{
    path: "/enterprise/oa/workbench/approval",
    meta: {
        title: "审批",
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_approval",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/approval"),
},
{
    path: "/enterprise/oa/workbench/copy",
    meta: {
        title: "抄送",
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_copy",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/copy"),
},
{
    path: "/enterprise/oa/workbench/draft",
    meta: {
        title: "草稿箱",
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_workbench_draft",
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/draft"),
},
];