import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/enterprise/engineering/contract',
        name: 'enterprise_engineering_contract',
        meta: {
            title: '合同管理',
            level: 2,
            icon: 'iconfont btn-icon_homepage_menu_10',
            permission: ['ProjectInfoContractManage']
        },
        component: ViewLayout,
        children: [
            {
                path: '/enterprise/engineering/contract/list',
                meta: {
                    title: '合同台账',
                    needAlive: true,
                    level: 3,
                    permission: ['ProjectInfoContract'],
                },
                name: 'enterprise_engineering_contract_list',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_contract" */ '@/views/enterprise/engineering/contract/list'
                    )
            },
            {
                path: '/enterprise/engineering/contract/list/measurement',
                meta: {
                    title: '发起计量',
                    select_path: '/enterprise/engineering/contract/list'
                },
                name: 'enterprise_engineering_contract_measurement',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/contract/list/apply'
                    )
            },
            {
                path: '/enterprise/engineering/contract/list/payment',
                meta: {
                    title: '发起付款',
                    select_path: '/enterprise/engineering/contract/list'
                },
                name: 'enterprise_engineering_contract_payment',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/contract/list/apply'
                    )
            },
            {
                path: '/enterprise/engineering/contract/dynamic',
                meta: {
                    title: '合同动态管理',
                    needAlive: true,
                    level: 3,
                    permission: ['OAContractApprovalDynamic'],
                },
                name: 'enterprise_engineering_contract_dynamic',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_contract" */ '@/views/enterprise/engineering/contract/dynamic'
                    )
            },
        ]
    },
]
