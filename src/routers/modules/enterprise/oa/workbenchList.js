export default [{
    path: "/enterprise/oa/accounts/attendance/leave",
    meta: {
        title: "请假表",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_account_attendance_leave",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/accounts/attendance/leave"),
},
{
    path: "/enterprise/oa/business",
    meta: {
        title: "出差申请表",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_business",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/business"),
},
{
    path: "/enterprise/oa/overtime",
    meta: {
        title: "加班申请表",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_overtime",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/overtime"),
},
{
    path: "/enterprise/oa/movement",
    meta: {
        title: "人员调动",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_movement",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/movement"),
},
{
    path: "/enterprise/oa/schemeApproval",
    meta: {
        title: "方案审批",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_schemeApproval",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/schemeApproval"),
},
{
    path: "/enterprise/oa/documents",
    meta: {
        title: "内部文件",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_documents",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/documents"),
},
{
    path: "/enterprise/oa/party",
    meta: {
        title: "入党申请",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_party",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/party"),
},
{
    path: "/enterprise/oa/hardworkers",
    meta: {
        title: "困难职工",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_hardworkers",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/hardworkers"),
},
{
    path: "/enterprise/oa/helpStudy",
    meta: {
        title: "金秋助学",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_helpStudy",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/helpStudy"),
},
{
    path: "/enterprise/oa/sickCondolence",
    meta: {
        title: "生病慰问",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_sickCondolence",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/sickCondolence"),
},
{
    path: "/enterprise/oa/compensate",
    meta: {
        title: "补偿申请",
        secondAlive: true,
        select_path: "/enterprise/oa/workbench",
    },
    name: "enterprise_oa_compensate",
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/compensate"),
},
{
    path: "/enterprise/oa/purchasing",
    name: "enterprise_oa_purchasing",
    meta: {
        title: "采购申请",
        secondAlive: true,
        icon: "iconfont btn-icon_homepage_menu_18",
        select_path: "/enterprise/oa/workbench",
    },
    component: () =>
        import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/list/purchasing"),
},
{
    path: "/enterprise/oa/contract",
    name: "enterprise_oa_contract",
    meta: {
        title: "合同申请",
        secondAlive: true,
        icon: "iconfont btn-icon_leftbar_folder",
        select_path: "/enterprise/oa/workbench",
    },
    component: () =>
        import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/list/contract"),
},
{
    path: "/enterprise/oa/WithLoan",
    name: "enterprise_oa_WithLoan",
    meta: {
        title: "用款申请",
        secondAlive: true,
        icon: "iconfont btn-icon_leftbar_money",
        select_path: "/enterprise/oa/workbench",
    },
    component: () =>
        import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/list/WithLoan"),
},
{
    path: "/enterprise/oa/Seal",
    name: "enterprise_oa_Seal",
    meta: {
        title: "用章申请",
        secondAlive: true,
        icon: "iconfont btn-icon_leftbar_information",
        select_path: "/enterprise/oa/workbench",
    },
    component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/list/seal"),
},
{
    path: "/enterprise/oa/invoice",
    name: "enterprise_oa_invoice",
    meta: {
        title: "共享发票",
        secondAlive: true,
        icon: "iconfont btn-icon_leftbar_information",
        select_path: "/enterprise/oa/workbench",
    },
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/invoice/list"),
},
{
    path: "/enterprise/oa/invoice/total",
    name: "enterprise_oa_invoice_total",
    meta: {
        title: "共享发票汇总",
        secondAlive: true,
        icon: "iconfont btn-icon_leftbar_information",
        select_path: "/enterprise/oa/workbench",
    },
    component: () =>
        import(/* webpackChunkName: "enterprise_material" */ "@/views/enterprise/oa/workbench/list/invoice/total"),
},
    // {
    //     path: "/enterprise/oa/voted",
    //     name: "enterprise_oa_voted",
    //     meta: {
    //         title: "投票比选",
    //         secondAlive: true,
    //         icon: "iconfont btn-icon_homepage_menu_21",
    //         select_path: "/enterprise/oa/workbench",
    //     },
    //     component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/list/voted"),
    // },
    // {
    //     path: "/enterprise/oa/voted/info",
    //     name: "enterprise_oa_voted_info",
    //     meta: {
    //         title: "投票比选详情",
    //         icon: "iconfont btn-icon_homepage_menu_21",
    //         select_path: "/enterprise/oa/voted",
    //     },
    //     component: () =>
    //         import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/list/voted/info"),
    // },

    // {
    //     path: "/enterprise/oa/transfers",
    //     name: "enterprise_oa_transfers",
    //     meta: {
    //         title: "调拨申请",
    //         secondAlive: true,
    //         icon: "iconfont btn-icon_leftbar_information",
    //     },
    //     component: () =>
    //         import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/list/transfers"),
    // },
]