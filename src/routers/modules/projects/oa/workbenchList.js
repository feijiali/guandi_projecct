export default [{
    path: '/project/oa/accounts/attendance/leave',
    meta: {
        title: '请假表',
        isProject: true,
        needAlive: true,
        select_path: '/project/oa/workbench',
    },
    name: 'project_oa_account_attendance_leave',
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ '@/views/enterprise/oa/accounts/attendance/leave')
},
{
    path: "/project/oa/business",
    meta: {
        title: "出差申请表",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_business",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/business"),
},
{
    path: "/project/oa/overtime",
    meta: {
        title: "加班申请表",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_overtime",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/overtime"),
},
{
    path: "/project/oa/movement",
    meta: {
        title: "人员调动",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_movement",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/movement"),
},
{
    path: "/project/oa/schemeApproval",
    meta: {
        title: "方案审批",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_schemeApproval",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/schemeApproval"),
},
{
    path: "/project/oa/documents",
    meta: {
        title: "内部文件",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_documents",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/documents"),
},
{
    path: "/project/oa/party",
    meta: {
        title: "入党申请",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_party",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/party"),
},
{
    path: "/project/oa/hardworkers",
    meta: {
        title: "困难职工",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_hardworkers",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/hardworkers"),
},
{
    path: "/project/oa/helpStudy",
    meta: {
        title: "金秋助学",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_helpStudy",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/helpStudy"),
},
{
    path: "/project/oa/sickCondolence",
    meta: {
        title: "生病慰问",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_sickCondolence",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/sickCondolence"),
},
{
    path: "/project/oa/compensate",
    meta: {
        title: "补偿申请",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    name: "project_oa_compensate",
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/compensate"),
},
{
    path: '/project/oa/purchasing',
    name: 'project_oa_purchasing',
    meta: {
        title: '采购申请',
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/list/purchasing')
},
{
    path: '/project/oa/contract',
    name: 'project_oa_contract',
    meta: {
        title: '合同申请',
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/list/contract')
},
{
    path: '/project/oa/WithLoan',
    name: 'project_oa_WithLoan',
    meta: {
        title: '用款申请',
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/list/WithLoan')
},
{
    path: '/project/oa/Seal',
    name: 'project_oa_Seal',
    meta: {
        title: '用章申请',
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/list/seal')
},
{
    path: "/project/oa/invoice",
    name: "project_oa_invoice",
    meta: {
        title: "共享发票",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    component: () => import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/invoice/list"),
},
{
    path: "/project/oa/invoice/total",
    name: "project_oa_invoice_total",
    meta: {
        title: "共享发票汇总",
        isProject: true,
        needAlive: true,
        select_path: "/project/oa/workbench",
    },
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/invoice/total"),
},
    // {
    //     path: '/project/oa/voted',
    //     name: 'project_oa_voted',
    //     meta: {
    //         title: '投票比选',
    //         isProject: true,
    //         needAlive: true,
    //         select_path: "/project/oa/workbench",
    //     },
    //     component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/list/voted')
    // },
    // {
    //     path: '/project/oa/voted/info',
    //     name: 'project_oa_voted_info',
    //     meta: {
    //         title: '投票比选详情',
    //         icon: 'iconfont btn-icon_homepage_menu_21',
    //         select_path: '/project/oa/voted',
    //         isProject: true,
    //     },
    //     component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/list/voted/info')
    // },

    // {
    //     path: '/project/oa/transfers',
    //     name: 'project_oa_transfers',
    //     meta: {
    //         title: '调拨申请',
    //         isProject: true,
    //         needAlive: true,
    //         select_path: "/project/oa/workbench",
    //     },
    //     component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/workbench/list/transfers')
    // }
]