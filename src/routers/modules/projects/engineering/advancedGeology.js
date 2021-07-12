export default [
    {
        path: '/project/advancedGeology',
        name: 'project_engineering_advancedGeology',
        meta: {
            title: '超前地质预报',
            prolevel: 1,
            permission: ['TunnelGeologyPredict'],
            icon: 'iconfont btn-icon_homepage_menu_12',
            isProject: true
        },
        component: () =>
            import(/* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/advancedGeology')
    },
    {
        path: '/project/engineering/advancedGeology/list',
        name: 'project_engineering_advancedGeology_list',
        meta: {
            title: '超前地质',
            isProject: true,
            select_path: '/project/advancedGeology'
        },
        component: () =>
            import(/* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/advancedGeology/list')
    },
    {
        path: '/project/engineering/advancedGeology/handle',
        name: 'project_engineering_advancedGeology_handle',
        meta: {
            title: '超前地质',
            isProject: true,
            select_path: '/project/advancedGeology'
        },
        component: () =>
            import(/* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/advancedGeology/handle')
    }
]
