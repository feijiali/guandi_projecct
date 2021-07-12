export default [{
    path: "/project/oa/accounts/labourRealName",
    meta: {
        title: "劳务实名制",
        prolevel: 3,
        isProject: true,
        permission: ["StaffWorker"],
    },
    name: "project_oa_account_labourRealName",
    component: () =>
        import(/* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName"),
    redirect: {
        name: "project_oa_account_labourRealName_labour"
    },
    children: [{
        path: "/project/oa/accounts/labourRealName/labour",
        meta: {
            title: "入场登记",
            isProject: true,
            keepAlive: true,
            permission: ["StaffWorker"],
            select_path: "/project/oa/accounts/labourRealName",
        },
        name: "project_oa_account_labourRealName_labour",
        component: () =>
            import(
                    /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName/labour"
            ),
    }, {
        path: "/project/oa/accounts/labourRealName/attendance",
        meta: {
            title: "考勤记录",
            isProject: true,
            keepAlive: true,
            permission: ["StaffWorker"],
            select_path: "/enprojectterprise/oa/accounts/labourRealName",
        },
        name: "project_oa_account_labourRealName_attendance",
        component: () =>
            import(
                    /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName/attendance"
            ),
    }, {
        path: "/project/oa/accounts/labourRealName/special",
        meta: {
            title: "特殊工种",
            isProject: true,
            keepAlive: true,
            permission: ["StaffWorker"],
            select_path: "/project/oa/accounts/labourRealName",
        },
        name: "project_oa_account_labourRealName_special",
        component: () =>
            import(
                    /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName/special"
            ),
    }, {
        path: "/project/oa/accounts/labourRealName/team",
        meta: {
            title: "班组维护",
            isProject: true,
            keepAlive: true,
            select_path: "/project/oa/accounts/labourRealName",
        },
        name: "project_oa_account_labourRealName_team",
        component: () =>
            import(
                    /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName/team"
            ),
    },
    ],

},
{
    path: "/project/oa/accounts/labourRealName/handleLabour",
    meta: {
        title: "劳务实名制新增",
        isProject: true,
        select_path: "/project/oa/accounts/labourRealName",
    },
    name: "project_oa_account_labourRealName_handleLabour",
    component: () =>
        import(
                /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName/labour/handle"
        ),
}, {
    path: "/project/oa/accounts/labourRealName/handleSpecial",
    meta: {
        title: "特殊工种新增",
        isProject: true,
        select_path: "/project/oa/accounts/labourRealName",
    },
    name: "project_oa_account_labourRealName_handleSpecial",
    component: () =>
        import(
                /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName/special/handle"
        ),
},
{
    path: "/project/oa/accounts/labourRealName/handleTeam",
    meta: {
        title: "班组新增",
        isProject: true,
        select_path: "/project/oa/accounts/labourRealName",
    },
    name: "project_oa_account_labourRealName_handleTeam",
    component: () =>
        import(
                /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/labourRealName/team/handle"
        ),
},
]