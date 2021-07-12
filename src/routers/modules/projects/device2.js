/*
 * @Autor: 邓易
 * @Date: 2020-12-15 14:05:41
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-05 14:20:42
 */
import { SubmenuLayoutProject } from '@/layouts'

export default {
    path: '/project/material2/device',
    name: 'project_material2_device',
    meta: {
        title: '设备管理',
        prolevel: 2,
        permission: ['deviceManageGuandi'],
        icon: 'iconfont btn-icon_homepage_menu_11'
    },
    component: SubmenuLayoutProject,
    children: [
        {
            path: '/project/material2/device/self',
            meta: {
                title: '自有设备台账',
                keepAlive: true,
                isProject: true,
                select_path: '/project/material2/device',
                permission: ['EquipmentStandingBook'],
                prolevel: 3
            },
            name: 'project_material2_device_self',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/self'
                )
        },
        {
            path: '/project/material2/device/self/edit',
            meta: {
                title: '编辑自有设备信息',
                isProject: true,
                select_path: '/project/material2/device'
            },
            name: 'project_material2_device_self_edit',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/self/Edit'
                )
        },
        {
            path: '/project/material2/device/lease',
            meta: {
                title: '租赁设备台账',
                isProject: true,
                select_path: '/project/material2/device',
                permission: ['EquipmentStandingBook'],
                keepAlive: true,
                prolevel: 3
            },
            name: 'project_material2_device_lease',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/lease'
                )
        },
        {
            path: '/project/material2/device/lease/edit',
            meta: {
                title: '编辑租赁设备信息',
                isProject: true,
                select_path: '/project/material2/device'
            },
            name: 'project_material2_device_lease_edit',
            component: () =>
                import(
                    /* webpackChunkName: "enterprise_material" */ '@/views/enterprise/material/device/lease/Edit'
                )
        }
    ]
}
