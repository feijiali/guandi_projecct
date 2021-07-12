import { ViewLayout } from '@/layouts';
export default [
    {
        path: "/project/engineering/changeStanding",
        meta: {
            title: "变更台账",
            isProject: true,
            prolevel: 1,
            icon: "iconfont btn-icon_homepage_menu_09",
            permission: ["ChangeParameter"],
        },
        name: "project_engineering_changeStanding",
        component: ViewLayout,
        children: [
            {
                path: "/project/engineering/changeStanding/total",
                meta: {
                    title: "变更总览",
                    isProject: true,
                    prolevel: 2,
                    permission: ["ChangeParameterParameterSummary"],
                    // needAlive: true,
                },
                name: "project_engineering_changeStanding_total",
                component: () =>
                    import(/* webpackChunkname: "project_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/total"),
            },
            {
                path: "/project/engineering/changeStanding/total/summary",
                meta: {
                    title: "变更情况统计",
                    isProject: true,
                    select_path: '/project/engineering/changeStanding/total',
                },
                name: "project_engineering_changeStanding_summary",
                component: () =>
                    import(/* webpackChunkname: "project_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/total/summary"),
            },
            {
                path: "/project/engineering/changeStanding/list",
                meta: {
                    title: "变更台账",
                    isProject: true,
                    prolevel: 2,
                    permission: ["ChangeParameterParameter", "ChangeParameterParameterInfo"],
                    needAlive: true,
                },
                name: "project_engineering_changeStanding_list",
                component: () =>
                    import(/* webpackChunkname: "project_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list"),
            },
            {
                path: "/project/engineering/changeStanding/list/info",
                meta: {
                    title: "变更台账详情",
                    isProject: true,
                    select_path: '/project/engineering/changeStanding/list',
                },
                name: "project_engineering_changeStanding_list_info",
                component: () => import(/* webpackChunkName: "project_engineering_changeStanding" */ "@/views/enterprise/oa/workbench/info"),
            },
            {
                path: "/project/engineering/changeStanding/list/handle",
                meta: {
                    title: "变更台账新增",
                    isProject: true,
                    select_path: '/project/engineering/changeStanding/list',
                },
                name: "project_engineering_changeStanding_list_handle",
                component: () =>
                    import(/* webpackChunkname: "project_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/handle"),
            },
            {
                path: "/project/engineering/changeStanding/list/update",
                meta: {
                    title: "更新变更台账",
                    isProject: true,
                    select_path: '/project/engineering/changeStanding/list',
                },
                name: "project_engineering_changeStanding_list_update",
                component: () =>
                    import(/* webpackChunkname: "project_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/update"),
            },
            {
                path: "/project/engineering/changeStanding/list/update/updateInfo",
                meta: {
                    title: "更新变更台账详情",
                    isProject: true,
                    select_path: '/project/engineering/changeStanding/list',
                },
                name: "project_engineering_changeStanding_list_update_updateInfo",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/updateInfo"),
            },
            {
                path: "/project/engineering/changeStanding/list/update/updateHandle",
                meta: {
                    title: "更新变更台账",
                    isProject: true,
                    select_path: '/enterprise/engineering/changeStanding/list',
                },
                name: "project_engineering_changeStanding_list_update_updateHandle",
                component: () =>
                    import(/* webpackChunkname: "enterprise_engineering_changeStanding" */ "@/views/enterprise/engineering/changeStanding/list/updateHandle"),
            },
        ],
    },
];
