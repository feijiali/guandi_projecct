import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/enterprise/engineering/costCalculation',
        name: 'enterprise_engineering_costCalculation',
        meta: {
            title: '成本测算',
            level: 2,
            icon: 'iconfont btn-icon_leftbar_equipment',
            permission: ['Costestimation']
        },
        component: ViewLayout,
        children: [
            {
                path: '/enterprise/engineering/costCalculation/projectAssessment',
                meta: {
                    title: '项目考核',
                    level: 3,
                    select_path: '/enterprise/engineering/costCalculation/projectAssessment',
                    permission: ['CostEstimationProjectAssessment']
                },
                name: 'enterprise_engineering_costCalculation_projectAssessment',
                component: () =>
                    import(
                  /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/costCalculation/projectAssessment'
                    )
            },
            {
                path: '/enterprise/engineering/costCalculation/Cost',
                meta: {
                    title: '成本测算',
                    level: 3,
                    select_path: '/enterprise/engineering/costCalculation/Cost',
                    permission: ['CostEstimationCostInfo']
                },
                name: 'enterprise_engineering_costCalculation_Cost',
                component: () =>
                    import(
                  /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/costCalculation/Cost'
                    )
            },
            {
                path: '/enterprise/engineering/costCalculation/mainProject',
                meta: {
                    title: '主体工程表',
                    level: 3,
                    select_path: '/enterprise/engineering/costCalculation/mainProject',
                    permission: ['CostEstimationMainProject']
                },
                name: 'enterprise_engineering_costCalculation_mainProject',
                component: () =>
                    import(
                  /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/costCalculation/mainProject'
                    )
            },
            {
                path: '/enterprise/engineering/costCalculation/Administration',
                meta: {
                    title: '管理费用表',
                    level: 3,
                    select_path: '/enterprise/engineering/costCalculation/Administration',
                    permission: ['CostEstimationManageInfo']
                },
                name: 'enterprise_engineering_costCalculation_Administration',
                component: () =>
                    import(
                  /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/costCalculation/Administration'
                    )
            },
            {
                path: '/enterprise/engineering/costCalculation/ownerDiscount',
                meta: {
                    title: '业主扣回表',
                    level: 3,
                    select_path: '/enterprise/engineering/costCalculation/ownerDiscount',
                    permission: ['CostEstimationRebate']
                },
                name: 'enterprise_engineering_costCalculation_ownerDiscount',
                component: () =>
                    import(
                  /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/engineering/costCalculation/ownerDiscount'
                    )
            },
        ]
    },
]
