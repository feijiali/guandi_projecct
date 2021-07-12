export default [
    {
        path: '/project/oa/infoResources/informationList',
        name: 'project_oa_infoResources_informationList',
        meta: {
            title: '信息资源列表',
            needAlive: true,
            isProject: true,
            select_path: '/project/oa/infoResources'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_material" */ '@/views/enterprise/oa/infoResources/informationList'
            )
    },
    {
        path: '/project/oa/infoResources/newHolder',
        name: 'project_oa_infoResources_newHolder',
        meta: {
            title: '新增文件夹',
            isProject: true,

            // needAlive: true,
            // permission: ['OAInvoiceShare'],
            select_path: '/project/oa/infoResources'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_material" */ '@/views/enterprise/oa/infoResources/newHolder'
            )
    },
    {
        path: '/project/oa/infoResources/flieAttribute',
        name: 'project_oa_infoResources_flieAttribute',
        meta: {
            title: '文件属性',
            isProject: true,

            // needAlive: true,
            // permission: ['OAInvoiceShare'],
            select_path: '/project/oa/infoResources'
        },
        component: () =>
            import(/* webpackChunkName: "project_material" */ "@/views/enterprise/oa/infoResources/flieAttribute"),
    },
    {
        path: '/project/oa/infoResources/log',
        name: 'project_oa_infoResources_log',
        meta: {
            title: '文件日志',
            isProject: true,
            // needAlive: true,
            // permission: ['OAInvoiceShare'],
            select_path: '/project/oa/infoResources'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_material" */ '@/views/enterprise/oa/infoResources/log'
            )
    }
]
