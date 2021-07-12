import { ViewLayout } from '@/layouts';
export default [
    {
        path: '/project/engineering/contract',
        name: 'project_engineering_contract',
        meta: {
            title: '合同管理',
            isProject: true,
            prolevel: 1,
            icon: 'iconfont btn-icon_homepage_menu_10',
            permission: ['ProjectInfoContractManage']
        },
        component: ViewLayout,
        children: [
            {
                path: '/project/engineering/contract/list',
                meta: {
                    title: '合同台账',
                    needAlive: true,
                    isProject: true,
                    prolevel: 2,
                    permission: ['ProjectInfoContract'],
                },
                name: 'project_engineering_contract_list',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_contract" */ '@/views/enterprise/engineering/contract/list'
                    )
            },
            {
                path: '/project/engineering/contract/list/measurement',
                meta: {
                    title: '发起计量',
                    isProject: true,
                    select_path: '/project/engineering/contract/list'
                },
                name: 'project_engineering_contract_measurement',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/contract/list/apply'
                    )
            },
            {
                path: '/project/engineering/contract/list/payment',
                meta: {
                    title: '发起付款',
                    isProject: true,
                    select_path: '/project/engineering/contract/list'
                },
                name: 'project_engineering_contract_payment',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/engineering/contract/list/apply'
                    )
            },
            {
                path: '/project/engineering/contract/dynamic',
                meta: {
                    title: '合同动态管理',
                    needAlive: true,
                    isProject: true,
                    prolevel: 2,
                    permission: ['OAContractApprovalDynamic'],
                },
                name: 'project_engineering_contract_dynamic',
                component: () =>
                    import(
                /* webpackChunkName: "enterprise_contract" */ '@/views/enterprise/engineering/contract/dynamic'
                    )
            },
        ]
    },
]
