export default [{
    path: "/enterprise/oa/accounts/labourRealName",
    meta: {
        title: "劳务实名制",
        level: 3,
        permission: ["StaffWorker"],
    },
    name: "enterprise_oa_account_labourRealName",
    component: () =>
        import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName"),
    redirect: {
        name: "enterprise_oa_account_labourRealName_labour"
    },
    children: [{
        path: "/enterprise/oa/accounts/labourRealName/labour",
        meta: {
            title: "入场登记",
            permission: ["StaffWorker"],
            select_path: "/enterprise/oa/accounts/labourRealName",
        },
        name: "enterprise_oa_account_labourRealName_labour",
        component: () =>
            import(
                    /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName/labour"
            ),
    }, {
        path: "/enterprise/oa/accounts/labourRealName/handleLabour",
        meta: {
            title: "劳务实名制新增",
            select_path: "/enterprise/oa/accounts/labourRealName",
        },
        name: "enterprise_oa_account_labourRealName_handleLabour",
        component: () =>
            import(
                    /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName/labour/handle"
            ),
    }, {
        path: "/enterprise/oa/accounts/labourRealName/attendance",
        meta: {
            title: "考勤记录",
            permission: ["StaffWorker"],
            select_path: "/enterprise/oa/accounts/labourRealName",
        },
        name: "enterprise_oa_account_labourRealName_attendance",
        component: () =>
            import(
                    /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName/attendance"
            ),
    }, {
        path: "/enterprise/oa/accounts/labourRealName/special",
        meta: {
            title: "特殊工种",
            permission: ["StaffWorker"],
            select_path: "/enterprise/oa/accounts/labourRealName",
        },
        name: "enterprise_oa_account_labourRealName_special",
        component: () =>
            import(
                    /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName/special"
            ),
    }, {
        path: "/enterprise/oa/accounts/labourRealName/handleSpecial",
        meta: {
            title: "特殊工种新增",
            select_path: "/enterprise/oa/accounts/labourRealName",
        },
        name: "enterprise_oa_account_labourRealName_handleSpecial",
        component: () =>
            import(
                    /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName/special/handle"
            ),
    }, {
        path: "/enterprise/oa/accounts/labourRealName/team",
        meta: {
            title: "班组维护",
            permission: ["StaffWorker"],
            select_path: "/enterprise/oa/accounts/labourRealName",
        },
        name: "enterprise_oa_account_labourRealName_team",
        component: () =>
            import(
                    /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName/team"
            ),
    },
    {
        path: "/enterprise/oa/accounts/labourRealName/handleTeam",
        meta: {
            title: "班组新增",
            select_path: "/enterprise/oa/accounts/labourRealName",
        },
        name: "enterprise_oa_account_labourRealName_handleTeam",
        component: () =>
            import(
                    /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/labourRealName/team/handle"
            ),
    },
    ],
},

]