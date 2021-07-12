import { MenuLayout, ViewLayout } from '@/layouts'
import device from './device'
export default [
  {
    path: '/enterprise/material2',
    name: 'enterprise_material2',
    meta: {
      title: '机料管理',
      level: 1,
      permission: ['MaterialResources']
    },
    component: MenuLayout,
    children: [
      {
        path: '/enterprise/material2/manage',
        meta: {
          title: '材料管理',
          level: 2,
          icon: 'iconfont btn-icon_homepage_menu_18',
          permission: ['materialManageGuandi']
        },
        name: 'enterprise_material2_manage',
        component: ViewLayout,
        children: [
          {
            path: '/enterprise/material2/manage/wastage',
            meta: {
              title: '主要材料耗损',
              needAlive: true,
              level: 3
            },
            name: 'enterprise_material2_material_wastage',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/wastage'
              )
          },
          {
            path: '/enterprise/material2/manage/wastage/handle',
            meta: {
              title: '新增主要材料耗损',
              select_path: '/enterprise/material2/manage/wastage'
            },
            name: 'enterprise_material2_material_wastage_handle',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/wastage/handle'
              )
          },
          {
            path: '/enterprise/material2/manage/consumption',
            meta: {
              title: '工程材料用量',
              needAlive: true,
              level: 3
            },
            name: 'enterprise_material2_material_consumption',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/consumption'
              )
          },
          {
            path: '/enterprise/material2/manage/consumption/handle',
            meta: {
              title: '新增工程材料用量',
              select_path: '/enterprise/material2/manage/consumption'
            },
            name: 'enterprise_material2_material_consumption_handle',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/consumption/handle'
              )
          },
          {
            path: '/enterprise/material2/manage/dailyConstruction',
            meta: {
              title: '每日施工材料',
              needAlive: true,
              level: 3
            },
            name: 'enterprise_material2_material_dailyConstruction',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/dailyConstruction'
              )
          },
          {
            path: '/enterprise/material2/manage/dailyConstruction/handle',
            meta: {
              title: '新增每日施工材料',
              select_path: '/enterprise/material2/manage/dailyConstruction'
            },
            name: 'enterprise_material2_material_dailyConstruction_handle',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/dailyConstruction/handle'
              )
          },
          {
            path: '/enterprise/material2/manage/trendsOfRevolving',
            meta: {
              title: '周转材料动态',
              needAlive: true,
              level: 3
            },
            name: 'enterprise_material2_material_trendsOfRevolving',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/trendsOfRevolving'
              )
          },
          {
            path: '/enterprise/material2/manage/trendsOfRevolving/handle',
            meta: {
              title: '新增周转材料动态',
              select_path: '/enterprise/material2/manage/trendsOfRevolving'
            },
            name: 'enterprise_material2_material_trendsOfRevolving_handle',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/trendsOfRevolving/handle'
              )
          },
          {
            path: '/enterprise/material2/manage/receivingStorage',
            meta: {
              title: '材料收发存',
              needAlive: true,
              level: 3
            },
            name: 'enterprise_material2_material_receivingStorage',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/receivingStorage'
              )
          },
          {
            path: '/enterprise/material2/manage/receivingStorage/handle',
            meta: {
              title: '新增材料收发存',
              select_path: '/enterprise/material2/manage/receivingStorage'
            },
            name: 'enterprise_material2_material_receivingStorage_handle',
            component: () =>
              import(
                            /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/receivingStorage/handle'
              )
          },
          {
            path: '/enterprise/material2/manage/recept',
            meta: {
              title: '材料收发存汇总',
              needAlive: true,
              permission: ['MaterialStandingBook'],
              level: 3
            },
            name: 'enterprise_material2_manage_recept',
            component: () =>
              import(
                                /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/recept'
              )
          },
          {
            path: '/enterprise/material2/manage/recept/edit',
            meta: {
              title: '编辑材料收发存信息',
              select_path: '/enterprise/material2/manage/recept'
            },
            name: 'enterprise_material2_manage_recept_edit',
            component: () =>
              import(
                                /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/manage/recept/Edit'
              )
          },
          {
            path: '/enterprise/material2/manage/turnover',
            meta: {
              title: '周转材料使用费',
              needAlive: true,
              permission: ['MaterialStandingBook'],
              level: 3
            },
            name: 'enterprise_material2_manage_turnover',
            component: () =>
              import(
                                /* webpackChunkName: "enterprise_material2" */ '@/views/enterprise/material/manage/turnover'
              )
          },
          {
            path: '/enterprise/material2/manage/turnover/edit',
            meta: {
              title: '编辑周转材料使用费信息',
              select_path: '/enterprise/material2/manage/turnover'
            },
            name: 'enterprise_material2_manage_turnover_edit',
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
