import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/project/engineering/costCalculation',
        name: 'project_engineering_costCalculation',
        meta: {
            title: '成本测算',
            isProject: true,
            prolevel: 1,
            icon: 'iconfont btn-icon_leftbar_equipment',
            permission: ['Costestimation']
        },
        component: ViewLayout,
        children: [
            {
                path: '/project/engineering/costCalculation/projectAssessment',
                meta: {
                    title: '项目考核',
                    isProject: true,
                    prolevel: 2,
                    select_path: '/enterprise/engineering/costCalculation',
                    permission: ['CostEstimationProjectAssessment']
                },
                name: 'project_engineering_costCalculation_projectAssessment',
                component: () =>
                    import(
                  /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/costCalculation/projectAssessment'
                    )
            },
            {
                path: '/project/engineering/costCalculation/Cost',
                meta: {
                    title: '成本测算',
                    isProject: true,
                    prolevel: 2,
                    select_path: '/enterprise/engineering/costCalculation',
                    permission: ['CostEstimationCostInfo']
                },
                name: 'project_engineering_costCalculation_Cost',
                component: () =>
                    import(
                  /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/costCalculation/Cost'
                    )
            },
            {
                path: '/project/engineering/costCalculation/mainProject',
                meta: {
                    title: '主体工程表',
                    isProject: true,
                    prolevel: 2,
                    select_path: '/enterprise/engineering/costCalculation',
                    permission: ['CostEstimationMainProject']
                },
                name: 'project_engineering_costCalculation_mainProject',
                component: () =>
                    import(
                  /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/costCalculation/mainProject'
                    )
            },
            {
                path: '/project/engineering/costCalculation/Administration',
                meta: {
                    title: '管理费用表',
                    isProject: true,
                    prolevel: 2,
                    select_path: '/enterprise/engineering/costCalculation',
                    permission: ['CostEstimationManageInfo']
                },
                name: 'project_engineering_costCalculation_Administration',
                component: () =>
                    import(
                  /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/costCalculation/Administration'
                    )
            },
            {
                path: '/project/engineering/costCalculation/ownerDiscount',
                meta: {
                    title: '业主扣回表',
                    isProject: true,
                    prolevel: 2,
                    select_path: '/enterprise/engineering/costCalculation',
                    permission: ['CostEstimationRebate']
                },
                name: 'project_engineering_costCalculation_ownerDiscount',
                component: () =>
                    import(
                  /* webpackChunkName: "project_engineering" */ '@/views/enterprise/engineering/costCalculation/ownerDiscount'
                    )
            },
        ]
    },
]
