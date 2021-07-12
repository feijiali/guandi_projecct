import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/enterprise/engineering/metering',
        name: 'enterprise_engineering_metering',
        meta: {
            title: '计量管理',
            level: 2,
            icon: 'iconfont btn-icon_homepage_menu_14',
            permission: ['ProjectReportEngineeringMain', 'ProjectReportEngineeringPay']
        },
        component: ViewLayout,
        children: [
            {
                path: '/enterprise/engineering/metering/team',
                meta: {
                    title: '班组计量',
                    needAlive: true,
                    level: 3,
                    permission: ['ProjectReportEngineeringMain'],
                },
                name: 'enterprise_engineering_metering_team',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_metering" */ '@/views/enterprise/engineering/metering/team'
                    )
            },

            {
                path: '/enterprise/engineering/metering/contractPayment',
                meta: {
                    title: '合同付款',
                    needAlive: true,
                    level: 3,
                    permission: ['ProjectReportEngineeringPay'],
                },
                name: 'enterprise_engineering_metering_dynamic',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_metering" */ '@/views/enterprise/engineering/metering/contractPayment'
                    )
            },
            {
                path: '/enterprise/engineering/metering/contractPayment/list',
                meta: {
                    title: '合同付款明细',
                    needAlive: true,
                    select_path: '/enterprise/engineering/metering/contractPayment'
                },
                name: 'enterprise_engineering_metering_measurement_list',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/metering/contractPayment/list'
                    )
            },
            {
                path: '/enterprise/engineering/metering/contractPayment/info',
                meta: {
                    title: '合同付款明细详情',
                    select_path: '/enterprise/engineering/metering/contractPayment'
                },
                name: 'enterprise_engineering_metering_measurement_info',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/metering/contractPayment/info'
                    )
            },
            {
                path: '/enterprise/engineering/metering/list/payment',
                meta: {
                    title: '发起付款',
                    select_path: '/enterprise/engineering/metering/contractPayment'
                },
                name: 'enterprise_engineering_metering_payment',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/contract/list/apply'
                    )
            },
        ]
    },
]
