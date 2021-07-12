import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/enterprise/engineering/projectInfor',
        name: 'enterprise_engineering_projectInfor',
        meta: {
            title: '项目信息',
            level: 2,
            secondAlive: true,
            icon: 'iconfont btn-icon_leftbar_equipment',
            permission: ['ProjectInfoProject']
        },
        component: ViewLayout,
        children: [
            {
                path: '/enterprise/engineering/projectInfor/projectMaintenance',
                meta: {
                    title: '项目维护',
                    needAlive: true,
                    level: 3,
                    permission: ['QuantitiesChapterPlanValue'],
                    select_path: '/enterprise/engineering/projectInfor'
                },
                name: 'enterprise_engineering_projectInfor_projectMaintenance',
                component: () =>
                    import(
                  /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/projectInfor/projectMaintenance'
                    )
            },
            {
                path: '/enterprise/engineering/projectInfor/listManage',
                name: 'enterprise_engineering_projectInfor_listManage',
                meta: {
                    title: '清单管理',
                    level: 3,
                    icon: 'iconfont btn-icon_leftbar_equipment',
                    permission: ['ProjDetailListProjDetailMain','ProjDetailListProjDetailSplit','ProjDetailListProjDetailDiff'],
                },
                component: () =>
                    import(/* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/projectInfor/listManage'),
                // redirect: {
                //     name: "enterprise_engineering_projectInfor_listManage_projectList"
                // },
                children: [
                    //工程清单表
                    {
                        path: "/enterprise/engineering/projectInfor/listManage/projectList",
                        name: "enterprise_engineering_projectInfor_listManage_projectList",
                        meta: {
                            select_path: "/enterprise/engineering/projectInfor/listManage",
                            permission: ['ProjDetailListProjDetailMain'],
                        },
                        component: resolve =>
                            require([
                                "@/views/enterprise/engineering/projectInfor/listManage/projectList/index"
                            ], resolve)
                    },
                    //拆分清单
                    {
                        path: "/enterprise/engineering/projectInfor/listManage/splitList",
                        name: "enterprise_engineering_projectInfor_listManage_splitList",
                        meta: {
                            select_path: "/enterprise/engineering/projectInfor/listManage",
                            permission: ['ProjDetailListProjDetailSplit'],
                        },
                        component: resolve =>
                            require([
                                "@/views/enterprise/engineering/projectInfor/listManage/splitList/index"
                            ], resolve)
                    },
                    //分项清单
                    {
                        path: "/enterprise/engineering/projectInfor/listManage/subitemList",
                        name: "enterprise_engineering_projectInfor_listManage_subitemList",
                        meta: {
                            select_path: "/enterprise/engineering/projectInfor/listManage",
                            permission: ['ProjDetailListProjDetailDiff'],
                        },
                        component: resolve =>
                            require([
                                "@/views/enterprise/engineering/projectInfor/listManage/subitemList/index"
                            ], resolve)
                    }
                ]
            },
        ]
    },
    {
        path: '/enterprise/engineering/projectInfor/projectMaintenance/handle',
        name: 'enterprise_engineering_projectMaintenance_handle',
        meta: {
            title: '项目维护新增',
            select_path: '/enterprise/engineering/projectInfor'
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/projectInfor/projectMaintenance/handle'
            )
    },
    {
        path: '/enterprise/engineering/projectInfor/listManage/projectList/addProject',
        name: 'enterprise_engineering_projectList_addProject',
        meta: {
            title: '工程清单表新增',
            select_path: '/enterprise/engineering/projectInfor/listManage'
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/projectInfor/listManage/projectList/addProject'
            )
    },
    {
        path: '/enterprise/engineering/projectInfor/listManage/projectList/info',
        name: 'enterprise_engineering_projectList_info',
        meta: {
            title: '工程清单表详情',
            select_path: '/enterprise/engineering/projectInfor/listManage'
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/projectInfor/listManage/projectList/projectInfo'
            )
    },
    {
        path: '/enterprise/engineering/projectInfor/listManage/splitList/info',
        name: 'enterprise_engineering_splitList_info',
        meta: {
            title: '拆分清单表详情',
            select_path: '/enterprise/engineering/projectInfor/listManage'
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/projectInfor/listManage/splitList/projectInfo'
            )
    },
    {
        path: '/enterprise/engineering/projectInfor/listManage/subitemList/editSubitem',
        name: 'enterprise_engineering_subitemList_edit',
        meta: {
            title: '编辑分项清单',
            select_path: '/enterprise/engineering/projectInfor/listManage'
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/projectInfor/listManage/subitemList/editSubitem'
            )
    },
    {
        path: '/enterprise/engineering/projectInfor/listManage/splitList/editSplit',
        name: 'enterprise_engineering_splitList_edit',
        meta: {
            title: '编辑拆分工程',
            select_path: '/enterprise/engineering/projectInfor/listManage'
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/projectInfor/listManage/splitList/editSplit'
            )
    },
]
