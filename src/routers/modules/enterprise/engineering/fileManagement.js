import { SubmenuLayout } from '@/layouts';
export default [
    {
        path: '/enterprise/engineering/scheduleManagement/technology',
        name: 'enterprise_engineering_scheduleManagement_technology',
        meta: {
            title: '文件管理',
            level: 2,
            // needAlive: true,
            icon: 'iconfont btn-btn_edit',
            permission: ['technicalManagementAbstract']
        },
        component: SubmenuLayout,
        children: [
            {
                path: '/enterprise/engineering/scheduleManagement/technology/constructionPlan',
                meta: {
                    title: '施工方案',
                    needAlive: true,
                    level: 3,
                    permission: ['ProjectInfoTechnology'],
                    select_path: '/enterprise/engineering/scheduleManagement/technology'
                },
                name: 'enterprise_engineering_scheduleManagement_technology_constructionPlan',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/engineering/scheduleManagement/technology/constructionPlan'
                    )
            },
            {
                path: '/enterprise/engineering/scheduleManagement/technology/constructionPlan/new',
                meta: {
                    title: '新增',
                    select_path: '/enterprise/engineering/scheduleManagement/technology'
                },
                name: 'enterprise_engineering_scheduleManagement_technology_constructionPlan_new',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/scheduleManagement/technology/constructionPlan/new'
                    )
            },
            {
                path: '/enterprise/engineering/scheduleManagement/technology/constructionDrawings',
                meta: {
                    title: '施工图纸',
                    needAlive: true,
                    level: 3,
                    permission: ['ProjectInfoProjectDoc'],
                    select_path: '/enterprise/engineering/scheduleManagement/technology'
                },
                name: 'enterprise_engineering_scheduleManagement_technology_constructionDrawings',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/engineering/scheduleManagement/technology/constructionDrawings'
                    )
            },
            {
                path: '/enterprise/engineering/scheduleManagement/technology/projectInfoTechConfess',
                meta: {
                    title: '技术交底',
                    needAlive: true,
                    level: 3,
                    permission: ['ProjectInfoTechConfess'],
                    select_path: '/enterprise/engineering/scheduleManagement/technology'
                },
                name: 'enterprise_engineering_scheduleManagement_technology_projectInfoTechConfess',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/engineering/scheduleManagement/technology/projectInfoTechConfess'
                    )
            },
            {
                path: '/enterprise/engineering/scheduleManagement/technology/projectInfoTechConfess/handle',
                meta: {
                    title: '技术交底新增',
                    select_path: '/enterprise/engineering/scheduleManagement/technology'
                },
                name: 'enterprise_engineering_scheduleManagement_technology_projectInfoTechConfess_handle',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/scheduleManagement/technology/projectInfoTechConfess/handle'
                    )
            },

        ]
    },
]
