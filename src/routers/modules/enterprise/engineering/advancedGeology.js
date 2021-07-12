export default [
    {
        path: '/enterprise/engineering/advancedGeology',
        name: 'enterprise_engineering_advancedGeology',
        meta: {
            title: '超前地质预报',
            permission: ['TunnelGeologyPredict'],
            icon: 'iconfont btn-icon_homepage_menu_12',
            level: 2,
            secondAlive: true
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/advancedGeology/index'
            )
    },
    {
        path: '/enterprise/engineering/advancedGeology/list',
        name: 'enterprise_engineering_advancedGeology_list',
        meta: {
            title: '超前地质',
            secondAlive: true,
            select_path: '/enterprise/engineering/advancedGeology'
        },
        component: () =>
            import(/* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/advancedGeology/list')
    },
    {
        path: '/enterprise/engineering/advancedGeology/handle',
        name: 'enterprise_engineering_advancedGeology_handle',
        meta: {
            title: '超前地质',
            select_path: '/enterprise/engineering/advancedGeology'
        },
        component: () =>
            import(
        /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/advancedGeology/handle'
            )
    },
]
