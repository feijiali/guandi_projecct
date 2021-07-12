export default [
    {
        path: '/project/oa/newAnnouncement',
        name: 'project_oa_newAnnouncement',
        meta: {
            title: '公告发布',
            isProject: true,
            // needAlive: true,
            // permission: ['OAInvoiceShare'],
            select_path: '/project/oa/announcements'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_material" */ '@/views/enterprise/oa/announcements/newAnnouncement'
            )
    },
    {
        path: '/project/oa/allAnnouncement',
        name: 'project_oa_allAnnouncement',
        meta: {
            title: '全部公告',
            isProject: true,
            // needAlive: true,
            // permission: ['OAInvoiceShare'],
            select_path: '/project/oa/announcements'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_material" */ '@/views/enterprise/oa/announcements/allAnnouncement'
            )
    },
    {
        path: '/project/oa/announcementDetails',
        name: 'project_oa_announcementDetails',
        meta: {
            title: '公告详情',
            isProject: true,
            needAlive: true,
            // permission: ['OAInvoiceShare'],
            select_path: '/project/oa/announcements'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_material" */ '@/views/enterprise/oa/announcements/announcementDetails'
            )
    }
]
