/*
 * @Autor: 邓易
 * @Date: 2020-12-15 14:05:41
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-05 14:20:42
 */
import { ViewLayout, SubmenuLayout } from '@/layouts'

export default {
    path: '/enterprise/material2/device',
    name: 'enterprise_material2_device',
    meta: {
        title: '设备管理',
        level: 2,
        permission: ['deviceManageGuandi'],
        secondAlive: true,
        icon: 'iconfont btn-icon_homepage_menu_11'
    },
    component: ViewLayout,
    children: [
        {
            path: '/enterprise/material2/device/self',
            meta: {
                title: '自有设备台账',
                needAlive: true,
                permission: ['EquipmentStandingBook'],
                level: 3
            },
            name: 'enterprise_material2_device_self',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/self'
                )
        },
        {
            path: '/enterprise/material2/device/self/edit',
            meta: {
                title: '编辑自有设备信息',
                select_path: '/enterprise/material2/device/self'
            },
            name: 'enterprise_material2_device_self_edit',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/self/Edit'
                )
        },
        {
            path: '/enterprise/material2/device/lease',
            meta: {
                title: '租赁设备台账',
                permission: ['EquipmentStandingBook'],
                needAlive: true,
                level: 3
            },
            name: 'enterprise_material2_device_lease',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/lease'
                )
        },
        {
            path: '/enterprise/material2/device/lease/edit',
            meta: {
                title: '编辑租赁设备信息',
                select_path: '/enterprise/material2/device/lease'
            },
            name: 'enterprise_material2_device_lease_edit',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/lease/Edit'
                )
        }
    ]
}
