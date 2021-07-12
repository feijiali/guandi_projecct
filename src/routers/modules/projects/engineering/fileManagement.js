import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/project/engineering/scheduleManagement/technology',
        name: 'project_engineering_scheduleManagement_technology',
        meta: {
            title: '文件管理',
            isProject: true,
            prolevel: 1,
            // needAlive: true,
            icon: 'iconfont btn-btn_edit',
            permission: ['technicalManagementAbstract']
        },
        component: ViewLayout,
        children: [
            {
                path: '/project/engineering/scheduleManagement/technology/constructionPlan',
                meta: {
                    title: '施工方案',
                    isProject: true,
                    prolevel: 2,
                    needAlive: true,
                    permission: ['ProjectInfoTechnology'],
                    select_path: '/project/engineering/scheduleManagement/technology'
                },
                name: 'project_engineering_scheduleManagement_technology_constructionPlan',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/engineering/scheduleManagement/technology/constructionPlan'
                    )
            },
            {
                path: '/project/engineering/scheduleManagement/technology/constructionPlan/new',
                meta: {
                    isProject: true,
                    title: '新增',
                    select_path: '/project/engineering/scheduleManagement/technology/constructionPlan'
                },
                name: 'project_engineering_scheduleManagement_technology_constructionPlan_new',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/scheduleManagement/technology/constructionPlan/new'
                    )
            },
            {
                path: '/project/engineering/scheduleManagement/technology/constructionDrawings',
                meta: {
                    isProject: true,
                    title: '施工图纸',
                    prolevel: 2,
                    permission: ['ProjectInfoTechnology'],
                    select_path: '/project/engineering/scheduleManagement/technology'
                },
                name: 'project_engineering_scheduleManagement_technology_constructionDrawings',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/engineering/scheduleManagement/technology/constructionDrawings'
                    )
            },
            {
                path: '/project/engineering/scheduleManagement/technology/projectInfoTechConfess',
                meta: {
                    isProject: true,
                    title: '技术交底',
                    prolevel: 2,
                    needAlive: true,
                    permission: ['ProjectInfoTechnology'],
                    select_path: '/project/engineering/scheduleManagement/technology'
                },
                name: 'project_engineering_scheduleManagement_technology_projectInfoTechConfess',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/engineering/scheduleManagement/technology/projectInfoTechConfess'
                    )
            },
            {
                path: '/project/engineering/scheduleManagement/technology/projectInfoTechConfess/handle',
                meta: {
                    isProject: true,
                    title: '技术交底新增',
                    select_path: '/project/engineering/scheduleManagement/technology/projectInfoTechConfess'
                },
                name: 'project_engineering_scheduleManagement_technology_projectInfoTechConfess_handle',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/scheduleManagement/technology/projectInfoTechConfess/handle'
                    )
            }
        ]
    },
]
