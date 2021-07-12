import { ViewLayout } from '@/layouts';
export default [
    {
        path: "/enterprise/engineering/changeStanding",
        meta: {
            title: "变更台账",
            level: 2,
            icon: "iconfont btn-icon_homepage_menu_09",
            permission: ["ChangeParameter"],
        },
        name: "enterprise_engineering_changeStanding",
        component: ViewLayout,
        children: [
            {
                path: "/enterprise/engineering/changeStanding/total",
                meta: {
                    title: "变更总览",
                    level: 3,
                    permission: ["ChangeParameterParameterSummary"],
                },
                name: "enterprise_engineering_changeStanding_total",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/total"),
            },
            {
                path: "/enterprise/engineering/changeStanding/total/summary",
                meta: {
                    title: "变更情况统计",
                    select_path: '/enterprise/engineering/changeStanding/total',
                },
                name: "enterprise_engineering_changeStanding_summary",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/total/summary"),
            },
            {
                path: "/enterprise/engineering/changeStanding/list",
                meta: {
                    title: "变更台账",
                    level: 3,
                    permission: ["ChangeParameterParameter", "ChangeParameterParameterInfo"],
                    needAlive: true,
                },
                name: "enterprise_engineering_changeStanding_list",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list"),
            },
            {
                path: "/enterprise/engineering/changeStanding/list/info",
                meta: {
                    title: "变更台账详情",
                    select_path: '/enterprise/engineering/changeStanding/list',
                },
                name: "enterprise_engineering_changeStanding_list_info",
                component: () => import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/workbench/info"),
            },
            {
                path: "/enterprise/engineering/changeStanding/list/handle",
                meta: {
                    title: "变更台账新增",
                    select_path: '/enterprise/engineering/changeStanding/list',
                },
                name: "enterprise_engineering_changeStanding_list_handle",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/handle"),
            },
            {
                path: "/enterprise/engineering/changeStanding/list/update",
                meta: {
                    title: "更新变更台账",
                    needAlive: true,
                    select_path: '/enterprise/engineering/changeStanding/list',
                },
                name: "enterprise_engineering_changeStanding_list_update",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/update"),
            },
            {
                path: "/enterprise/engineering/changeStanding/list/update/updateInfo",
                meta: {
                    title: "更新变更台账详情",
                    select_path: '/enterprise/engineering/changeStanding/list',
                },
                name: "enterprise_engineering_changeStanding_list_update_updateInfo",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/updateInfo"),
            },
            {
                path: "/enterprise/engineering/changeStanding/list/update/updateHandle",
                meta: {
                    title: "更新变更台账",
                    select_path: '/enterprise/engineering/changeStanding/list',
                },
                name: "enterprise_engineering_changeStanding_list_update_updateHandle",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/updateHandle"),
            },
        ],
    },
];
