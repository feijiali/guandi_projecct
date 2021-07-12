import { SubmenuLayout } from "@/layouts";
export default [{
    path: "/enterprise/quality/testManagementTip",
    name: "enterprise_quality_testManagementTip",
    meta: {
        title: "试验管理",
        level: 3,
        icon: "iconfont btn-icon_leftbar_home",
        // permission: ["TestManagement"]
    },
    component: () =>
        import(/* webpackChunkName: "enterprise_safety" */ "@/views/enterprise/quality/testManagementTip"),
    redirect: {
        name: "enterprise_quality_testManagementTip_testManagement"
    },
    children: [
        {
            path: "/enterprise/quality/testManagementTip/testManagement",
            meta: {
                title: "试块管理",
                select_path: "/enterprise/quality/testManagementTip",
            },
            name: "enterprise_quality_testManagementTip_testManagement",
            component: () =>
                import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/testManagementTip/testManagement"),
        },
        {
            path: "/enterprise/quality/testManagementTip/testManagement/handle",
            name: "enterprise_quality_testManagementTip_testManagement_handle",
            meta: {
                title: "试块管理新增",
                select_path: "/enterprise/quality/testManagementTip",
            },
            component: () =>
                import(
                /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/quality/testManagementTip/testManagement/handle"
                ),
        },
        {
            path: "/enterprise/quality/testManagementTip/otherFile",
            meta: {
                title: "其他文件管理",
                select_path: "/enterprise/quality/testManagementTip",
            },
            name: "enterprise_quality_testManagementTip_otherFile",
            component: () =>
                import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/testManagementTip/otherFile"),
        },
        {
            path: "/enterprise/quality/testManagementTip/otherFile/handle",
            name: "enterprise_quality_testManagementTip_otherFile_handle",
            meta: {
                title: "其他文件管理新增",
                select_path: "/enterprise/quality/testManagementTip",
            },
            component: () =>
                import(
                /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/quality/testManagementTip/otherFile/handle"
                ),
        },
    ]
},
];