import { MenuLayout, ViewLayout, SubmenuLayout } from '@/layouts';
export default [{
    path: '/enterprise/engineering/scheduleManagement/figure',
    meta: {
        title: '进度管理',
        level: 2,
        icon: 'iconfont btn-icon_bidding',
        permission: ['scheduleManagementAbstract']
    },
    name: 'enterprise_engineering_scheduleManagement_figure',
    component: ViewLayout,
    children: [
        {
            path: '/enterprise/engineering/scheduleManagement/figure/plan',
            meta: {
                title: '计划进度',
                needAlive: true,
                level: 3,
                permission: ['QuantitiesChapterPlanValue'],
                select_path: '/enterprise/engineering/scheduleManagement/figure'
            },
            name: 'enterprise_engineering_scheduleManagement_figure_plan',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/plan'
                )
        },
        {
            path: "/enterprise/engineering/scheduleManagement/figure/plan/info",
            meta: {
                title: "计划进度详情",
                select_path: "/enterprise/engineering/scheduleManagement/figure",
            },
            name: "enterprise_engineering_scheduleManagement_figure_plan_info",
            component: () =>
                import(
            /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/engineering/scheduleManagement/figure/plan/info"
                ),
        },
        {
            path: "/enterprise/engineering/scheduleManagement/figure/plan/reportPlan",
            meta: {
                title: "上报计划进度",
                select_path: "/enterprise/engineering/scheduleManagement/figure",
            },
            name: "enterprise_engineering_scheduleManagement_figure_plan_reportPlan",
            component: () =>
                import(
            /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/engineering/scheduleManagement/figure/plan/reportPlan"
                ),
        },
        {
            path: '/enterprise/engineering/scheduleManagement/figure/tunnelFigure',
            meta: {
                title: '隧道形象进度',
                needAlive: true,
                level: 3,
                permission: ['ProgressSummary'],
                select_path: '/enterprise/engineering/scheduleManagement/figure'
            },
            name: 'enterprise_engineering_scheduleManagement_figureManagement_figure_tunnelFigure',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/tunnelFigure'
                )
        },
        {
            path: '/enterprise/engineering/scheduleManagement/figure/bridgeFigure',
            meta: {
                title: '桥梁形象进度',
                needAlive: true,
                level: 3,
                permission: ['ProgressSummary'],
                select_path: '/enterprise/engineering/scheduleManagement/figure'
            },
            name: 'enterprise_engineering_scheduleManagement_figure_bridgeFigure',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/bridgeFigure'
                )
        },
        {
            path: '/enterprise/engineering/scheduleManagement/figure/roadFigure',
            meta: {
                title: '路基形象进度',
                needAlive: true,
                level: 3,
                permission: ['ProgressSummary'],
                select_path: '/enterprise/engineering/scheduleManagement/figure'
            },
            name: 'enterprise_engineering_scheduleManagement_figure_roadFigure',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/scheduleManagement/figure/roadFigure'
                )
        }
    ]
},]