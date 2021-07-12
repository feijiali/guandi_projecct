import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/project/engineering/metering',
        name: 'project_engineering_metering',
        meta: {
            title: '计量管理',
            isProject: true,
            prolevel: 1,
            icon: 'iconfont btn-icon_homepage_menu_14',
            permission: ['ProjectReportEngineeringMain', 'ProjectReportEngineeringPay']
        },
        component: ViewLayout,
        children: [
            {
                path: '/project/engineering/metering/team',
                meta: {
                    title: '班组计量',
                    needAlive: true,
                    isProject: true,
                    prolevel: 2,
                    permission: ['ProjectReportEngineeringMain'],
                },
                name: 'project_engineering_metering_team',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_metering" */ '@/views/enterprise/engineering/metering/team'
                    )
            },

            {
                path: '/project/engineering/metering/contractPayment',
                meta: {
                    title: '合同付款',
                    needAlive: true,
                    isProject: true,
                    prolevel: 2,
                    permission: ['ProjectReportEngineeringPay'],
                },
                name: 'project_engineering_metering_dynamic',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_metering" */ '@/views/enterprise/engineering/metering/contractPayment'
                    )
            },
            {
                path: '/project/engineering/metering/contractPayment/list',
                meta: {
                    title: '合同付款明细',
                    needAlive: true,
                    isProject: true,
                    select_path: '/project/engineering/metering/contractPayment'
                },
                name: 'project_engineering_metering_measurement_list',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/metering/contractPayment/list'
                    )
            },
            {
                path: '/project/engineering/metering/contractPayment/info',
                meta: {
                    title: '合同付款明细详情',
                    isProject: true,
                    select_path: '/project/engineering/metering/contractPayment'
                },
                name: 'project_engineering_metering_measurement_info',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/metering/contractPayment/info'
                    )
            },
            {
                path: '/project/engineering/metering/list/payment',
                meta: {
                    title: '发起付款',
                    isProject: true,
                    select_path: '/project/engineering/metering/contractPayment'
                },
                name: 'project_engineering_metering_payment',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/contract/list/apply'
                    )
            },
        ]
    },
]
