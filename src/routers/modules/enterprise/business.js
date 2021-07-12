export default [
    {
        path: '/enterprise/business',
        name: 'enterprise_business',
        meta: {
            title: '市场扩展',
            level: 1,
            permission: ['ManageSystemManageSystem']
            // icon: 'iconfont icon-icon_homepage_menu_25'
        },
        component: () =>
            import(/* webpackChunkName: "enterprise_business" */ '@/views/enterprise/business')
    }
]
