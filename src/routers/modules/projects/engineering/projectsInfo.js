import { ViewLayout, SubmenuLayoutProject } from '@/layouts';
export default [
    {
        path: "/project/projectsInfo",
        meta: {
            title: "项目维护",
            prolevel: 1,
            icon: "iconfont btn-icon_leftbar_equipment",
            isProject: true,
            permission: ["projectMaintenanceAbstract", "ProjectInfoProjectDoc"],
        },
        name: "project_projectsInfo",
        component: ViewLayout,
        children: [
            {
                path: "/project/projectsInfo/info",
                meta: {
                    title: "项目信息",
                    prolevel: 2,
                    isProject: true,
                    permission: ["ProjectInfoProject"],
                },
                name: "project_projectsInfo_info",
                component: () => import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/info"),
            },
            {
                path: "/project/projectsInfo/tunnel",
                meta: {
                    title: "隧道信息",
                    prolevel: 2,
                    isProject: true,
                    permission: ["TunnelUnitProj"],
                },
                name: "project_projectsInfo_tunnel",
                component: SubmenuLayoutProject,
                children: [
                    {
                        path: "/project/projectsInfo/tunnel/info",
                        meta: {
                            title: "隧道信息",
                            prolevel: 3,
                            isProject: true,
                            keepAlive: true,
                            select_path: "/project/projectsInfo/tunnel",
                            permission: ["TunnelUnitProj"],
                        },
                        name: "project_projectsInfo_tunnel_info",
                        component: () =>
                            import(/* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/info"),
                    },
                    {
                        path: "/project/projectsInfo/tunnel/info/handle",
                        meta: {
                            title: "隧道信息新增",
                            isProject: true,
                            select_path: "/project/projectsInfo/tunnel",
                        },
                        name: "project_projectsInfo_tunnel_info_handle",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/info/handle"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/tunnel/info/handleSubunits",
                        meta: {
                            title: "新增子单位工程信息",
                            select_path: "/project/projectsInfo/tunnel",
                            isProject: true,
                        },
                        name: "project_projectsInfo_tunnel_info_handleSubunits",
                        component: () =>
                            import(
                    /* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/info/handleSubunits"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/tunnel/liningRock",
                        meta: {
                            title: "衬砌围岩",
                            prolevel: 3,
                            permission: ["TunnelUnitProj"],
                            isProject: true,
                            keepAlive: true,
                            select_path: "/project/projectsInfo/tunnel",
                        },
                        name: "project_projectsInfo_tunnel_liningRock",
                        component: () =>
                            import(/* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/liningRock"),
                    },
                    {
                        path: "/project/projectsInfo/tunnel/liningRock/handle",
                        meta: {
                            title: "衬砌围岩新增",
                            isProject: true,
                            select_path: "/project/projectsInfo/tunnel",
                        },
                        name: "project_projectsInfo_tunnel_liningRock_handle",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/liningRock/handle"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/tunnel/liningUnit",
                        meta: {
                            title: "单位工程量",
                            prolevel: 3,
                            isProject: true,
                            keepAlive: true,
                            permission: ["TunnelUnitProj"],
                            select_path: "/project/projectsInfo/tunnel",
                        },
                        name: "project_projectsInfo_tunnel_liningUnit",
                        component: () =>
                            import(/* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/liningUnit"),
                    },
                    {
                        path: "/project/projectsInfo/tunnel/liningUnit/handle",
                        meta: {
                            title: "衬砌单位工程量新增",
                            isProject: true,
                            needAlive: true,

                            select_path: "/project/projectsInfo/tunnel",
                        },
                        name: "project_projectsInfo_tunnel_liningUnit_handle",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/liningUnit/handle"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/tunnel/liningMaterial",
                        meta: {
                            title: "衬砌材料",
                            prolevel: 3,
                            isProject: true,
                            keepAlive: true,
                            permission: ["TunnelUnitProj"],
                            select_path: "/project/projectsInfo/tunnel",
                        },
                        name: "project_projectsInfo_tunnel_liningMaterial",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/liningMaterial"
                            ),
                        redirect: { name: "project_projectsInfo_tunnel_liningMaterial_list1" },
                        children: [
                            {
                                path: "/project/projectsInfo/tunnel/liningMaterial/list1",
                                meta: {
                                    title: "衬砌材料",
                                    keepAlive: true,
                                    isProject: true,
                                    select_path: "/project/projectsInfo/tunnel",
                                },
                                name: "project_projectsInfo_tunnel_liningMaterial_list1",
                                component: () =>
                                    import(
                        /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/liningMaterial/list1"
                                    ),
                            },
                            {
                                path: "/project/projectsInfo/tunnel/liningMaterial/list2",
                                meta: {
                                    title: "衬砌材料",
                                    keepAlive: true,
                                    isProject: true,
                                    select_path: "/project/projectsInfo/tunnel",
                                },
                                name: "project_projectsInfo_tunnel_liningMaterial_list2",
                                component: () =>
                                    import(
                        /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/tunnel/liningMaterial/list2"
                                    ),
                            },
                        ],
                    },
                ],
            },
            {
                path: "/project/projectsInfo/bridge",
                meta: {
                    title: "桥梁信息",
                    prolevel: 2,
                    isProject: true,
                    permission: ["BridgeUnitProject"],
                },
                name: "project_projectsInfo_bridge",
                component: SubmenuLayoutProject,
                children: [
                    {
                        path: "/project/projectsInfo/bridge/info",
                        meta: {
                            title: "桥梁信息",
                            prolevel: 3,
                            isProject: true,
                            keepAlive: true,
                            select_path: "/project/projectsInfo/bridge",
                            permission: ["BridgeUnitProject"],
                        },
                        name: "project_projectsInfo_bridge_info",
                        component: () =>
                            import(/* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/bridge/info"),
                    },
                    {
                        path: "/project/projectsInfo/bridge/info/handle",
                        meta: {
                            title: "桥梁信息新增",
                            isProject: true,
                            select_path: "/project/projectsInfo/bridge",
                        },
                        name: "project_projectsInfo_bridge_info_handle",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/bridge/info/handle"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/bridge/info/handleSubunits",
                        meta: {
                            title: "新增桥梁子单位工程信息",
                            select_path: "/project/projectsInfo/bridge",
                            isProject: true,
                        },
                        name: "project_projectsInfo_bridge_info_handleSubunits",
                        component: () =>
                            import(
                    /* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/bridge/info/handleSubunits"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/bridge/structure",
                        meta: {
                            title: "构件信息",
                            prolevel: 3,
                            isProject: true,
                            keepAlive: true,
                            select_path: "/project/projectsInfo/bridge",
                            permission: ["BridgeBuild"],
                        },
                        name: "project_projectsInfo_bridge_structure",
                        component: () =>
                            import(/* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/bridge/structure"),
                    },
                    {
                        path: "/project/projectsInfo/bridge/structure/handle",
                        meta: {
                            title: "构件信息新增",
                            isProject: true,
                            select_path: "/project/projectsInfo/bridge",
                        },
                        name: "project_projectsInfo_bridge_structure_handle",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/bridge/structure/handle"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/bridge/unitQuantity",
                        meta: {
                            title: "单位工程量",
                            prolevel: 3,
                            isProject: true,
                            keepAlive: true,
                            select_path: "/project/projectsInfo/bridge",
                            permission: ["BridgeUnitProject"],
                        },
                        name: "project_projectsInfo_bridge_unitQuantity",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/bridge/unitQuantity"
                            ),
                    },
                    {
                        path: "/project/projectsInfo/bridge/unitQuantity/handle",
                        meta: {
                            title: "单位工程量新增",
                            isProject: true,
                            select_path: "/project/projectsInfo/bridge/unitQuantity",
                        },
                        name: "project_projectsInfo_bridge_unitQuantity_handle",
                        component: () =>
                            import(
                    /* webpackChunkname: "projects_projectsInfo" */ "@/views/projects/projectsInfo/bridge/unitQuantity/handle"
                            ),
                    },
                ],
            },
            {
                path: "/project/projectsInfo/subgrade",
                meta: {
                    title: "路基信息",
                    prolevel: 2,
                    isProject: true,
                    needAlive: true,
                    permission: ["RoadUnitProject"],
                },
                name: "project_projectsInfo_subgrade",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/subgrade"),
            },
            {
                path: "/project/projectsInfo/subgrade/handle",
                meta: {
                    title: "路基信息新增",
                    isProject: true,
                    select_path: "/project/projectsInfo/subgrade",
                },
                name: "project_projectsInfo_subgrade_handle",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/subgrade/handle"),
            },
            {
                path: "/project/projectsInfo/quantities",
                meta: {
                    title: "工程量清单",
                    prolevel: 2,
                    isProject: true,
                    permission: ["ProjDetailListProjDetailMain"],
                },
                name: "project_projectsInfo_quantities",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/quantities"),
            },
            {
                path: "/project/projectsInfo/quantities/info",
                meta: {
                    title: "工程量清单详情",
                    isProject: true,
                    select_path: "/project/projectsInfo/quantities",
                },
                name: "project_projectsInfo_quantities_info",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/quantities/info"),
            },
            {
                path: "/project/projectsInfo/quantities/addProject",
                meta: {
                    title: "工程量清单新增",
                    isProject: true,
                    select_path: "/project/projectsInfo/quantities",
                },
                name: "project_projectsInfo_quantities_addProject",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/quantities/addProject"),
            },
            {
                path: "/project/projectsInfo/splitList",
                meta: {
                    title: "拆分清单",
                    prolevel: 2,
                    isProject: true,
                    permission: ["ProjDetailListProjDetailSplit"],
                },
                name: "project_projectsInfo_splitList",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/splitList"),
            },
            {
                path: "/project/projectsInfo/splitList/projectInfo",
                meta: {
                    title: "拆分清单详情",
                    isProject: true,
                    select_path: "/project/projectsInfo/splitList",
                },
                name: "project_projectsInfo_splitList_projectInfo",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/splitList/projectInfo"),
            },
            {
                path: "/project/projectsInfo/splitList/editSplit",
                meta: {
                    title: "拆分清单新增",
                    isProject: true,
                    select_path: "/project/projectsInfo/splitList",
                },
                name: "project_projectsInfo_splitList_editSplit",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/splitList/editSplit"),
            },
            {
                path: "/project/projectsInfo/subitemList",
                meta: {
                    title: "分项清单",
                    prolevel: 2,
                    isProject: true,
                    permission: ["ProjDetailListProjDetailDiff"],
                },
                name: "project_projectsInfo_subitemList",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/subitemList"),
            },
            {
                path: "/project/projectsInfo/subitemList/editSubitem",
                meta: {
                    title: "分项清单新增",
                    isProject: true,
                    select_path: "/project/projectsInfo/splitList",
                },
                name: "project_projectsInfo_subitemList_editSubitem",
                component: () =>
                    import(/* webpackChunkName: "projects_projectsInfo" */ "@/views/projects/projectsInfo/subitemList/editSubitem"),
            },
            {
                path: "/project/projectsInfo/projectDynamic",
                meta: {
                    title: "项目动态",
                    prolevel: 2,
                    needAlive: true,
                    isProject: true,
                    permission: ["ArticleNews"],
                },
                name: "project_projectsInfo_projectDynamic",
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ "@/views/projects/projectsInfo/projectDynamic"
                    ),
            },
            {
                path: "/project/projectsInfo/projectDynamic/handle",
                meta: {
                    title: "新增项目动态",
                    select_path: "/project/projectsInfo/projectDynamic",
                    isProject: true,
                },
                name: "project_projectsInfo_projectDynamic_handle",
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ "@/views/projects/projectsInfo/projectDynamic/handle"
                    ),
            },
        ],
    },
]
