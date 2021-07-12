import { ViewLayout, SubmenuLayoutProject } from '@/layouts'
import device from './device2'
export default [
    {
        path: '/project/material2',
        name: 'project_material2',
        meta: {
            title: '机料管理',
            prolevel: 1,
            isProject: true,
            icon: 'iconfont btn-icon_homepage_menu_18',
            permission: ['MaterialResources']
        },
        component: ViewLayout,
        redirect: { name: 'project_material2_manage' },
        children: [
            {
                path: '/project/material2/manage',
                meta: {
                    title: '材料管理',
                    prolevel: 2,
                    isProject: true,
                    permission: ['materialManageGuandi']
                },
                name: 'project_material2_manage',
                component: SubmenuLayoutProject,
                children: [
                    {
                        path: '/project/material2/manage/recept',
                        meta: {
                            title: '材料收发存汇总',
                            keepAlive: true,
                            isProject: true,
                            select_path: '/project/material2/manage',
                            permission: ['MaterialStandingBook'],
                            prolevel: 3
                        },
                        name: 'project_material2_manage_recept',
                        component: () =>
                            import(
                                /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/recept'
                            )
                    },
                    {
                        path: '/project/material2/manage/recept/edit',
                        meta: {
                            title: '编辑材料收发存信息',
                            isProject: true,
                            select_path: '/project/material2/manage'
                        },
                        name: 'project_material2_manage_recept_edit',
                        component: () =>
                            import(
                                /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/recept/Edit'
                            )
                    },
                    {
                        path: '/project/material2/manage/turnover',
                        meta: {
                            title: '周转材料使用费',
                            keepAlive: true,
                            isProject: true,
                            select_path: '/project/material2/manage',
                            permission: ['MaterialStandingBook'],
                            prolevel: 3
                        },
                        name: 'project_material2_manage_turnover',
                        component: () =>
                            import(
                                /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/turnover'
                            )
                    },
                    {
                        path: '/project/material2/manage/turnover/edit',
                        meta: {
                            title: '编辑周转材料使用费信息',
                            isProject: true,
                            select_path: '/project/material2/manage',
                            select_path: '/enterprise/material2/manage/turnover'
                        },
                        name: 'project_material2_manage_turnover_edit',
                        component: () =>
                            import(
                                /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/turnover/Edit'
                            )
                    }
                ]
            },
            device
        ]
    }
]
