import { MenuLayout, ViewLayout, SubmenuLayout } from '@/layouts';
export default [{
    path: '/project/engineering/scheduleManagement/figure',
    meta: {
        title: '进度管理',
        prolevel: 1,
        permission: ['scheduleManagementAbstract'],
        icon: 'iconfont btn-icon_bidding',
        // needAlive: true,
        isProject: true
    },
    name: 'project_engineering_scheduleManagement_figure',
    component: ViewLayout,
    // component: () =>
    //   import(
    //     /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/engineering/scheduleManagement/figure"
    //   ),
    children: [
        {
            path: '/project/engineering/scheduleManagement/figure/plan',
            meta: {
                isProject: true,
                title: '计划进度',
                prolevel: 2,
                permission: ['QuantitiesChapterPlanValue'],
                select_path: '/project/engineering/scheduleManagement/figure'
            },
            name: 'project_engineering_scheduleManagement_figure_plan',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/plan'
                )
        },
        {
            path: "/project/engineering/scheduleManagement/figure/plan/info",
            meta: {
                isProject: true,
                title: "计划进度详情",
                select_path: "/project/engineering/scheduleManagement/figure/plan",
            },
            name: "project_engineering_scheduleManagement_figure_plan_info",
            component: () =>
                import(
            /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/engineering/scheduleManagement/figure/plan/info"
                ),
        },
        {
            path: "/project/engineering/scheduleManagement/figure/plan/reportPlan",
            meta: {
                isProject: true,
                title: "上报计划进度",
                select_path: "/project/engineering/scheduleManagement/figure",
            },
            name: "project_engineering_scheduleManagement_figure_plan_reportPlan",
            component: () =>
                import(
            /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/engineering/scheduleManagement/figure/plan/reportPlan"
                ),
        },
        {
            path: '/project/engineering/scheduleManagement/figure/tunnelFigure',
            meta: {
                isProject: true,
                title: '隧道形象进度',
                prolevel: 2,
                permission: ['ProgressSummary'],
                select_path: '/project/engineering/scheduleManagement/figure'
            },
            name: 'project_engineering_scheduleManagement_figureManagement_figure_tunnelFigure',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/tunnelFigure'
                )
        },
        {
            path: '/project/engineering/scheduleManagement/figure/bridgeFigure',
            meta: {
                isProject: true,
                title: '桥梁形象进度',
                prolevel: 2,
                permission: ['ProgressSummary'],
                select_path: '/project/engineering/scheduleManagement/figure'
            },
            name: 'project_engineering_scheduleManagement_figure_bridgeFigure',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/bridgeFigure'
                )
        },
        {
            path: '/project/engineering/scheduleManagement/figure/roadFigure',
            meta: {
                isProject: true,
                title: '路基形象进度',
                prolevel: 2,
                permission: ['ProgressSummary'],
                select_path: '/project/engineering/scheduleManagement/figure'
            },
            name: 'project_engineering_scheduleManagement_figure_roadFigure',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/roadFigure'
                )
        }
    ]
}]