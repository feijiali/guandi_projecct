export default [
    {
        path: '/project/oa/email/write',
        name: 'project_oa_email_write',
        meta: {
            title: '写邮件',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/write')
    },
    {
        path: '/project/oa/email/reply',
        name: 'project_oa_email_write_reply',
        meta: {
            title: '回复',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/write')
    },
    {
        path: '/project/oa/email/forwarding',
        name: 'project_oa_email_write_forwarding',
        meta: {
            title: '转发',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/oa/email/write'
            )
    },

    {
        path: '/project/oa/email/inbox',
        name: 'project_oa_email_inbox',
        meta: {
            title: '收件箱',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/oa/email/inbox')
    },
    {
        path: '/project/oa/email/inbox/reply',
        name: 'project_oa_email_inbox_reply',
        meta: {
            title: '收件箱回复',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/inbox/reply')
    },
    {
        path: '/project/oa/email/inbox/forwarding',
        name: 'project_oa_email_inbox_forwarding',
        meta: {
            title: '收件箱转发',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/inbox/forwarding'
            )
    },
    {
        path: '/project/oa/email/inbox/info',
        name: 'project_oa_email_inbox_info',
        meta: {
            title: '收件箱详情',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/inbox/info')
    },
    {
        path: '/project/oa/email/sented',
        name: 'project_oa_email_sented',
        meta: {
            title: '已发送',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/sented')
    },
    {
        path: '/project/oa/email/sented/reply',
        name: 'project_oa_email_sented_reply',
        meta: {
            title: '已发送再次编辑',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/sented/reply')
    },
    {
        path: '/project/oa/email/sented/forwarding',
        name: 'project_oa_email_sented_forwarding',
        meta: {
            title: '已发送转发',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/sented/forwarding'
            )
    },
    {
        path: '/project/oa/email/sented/info',
        name: 'project_oa_email_sented_info',
        meta: {
            title: '已发送详情',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/sented/info')
    },
    {
        path: '/project/oa/email/stars',
        name: 'project_oa_email_stars',
        meta: {
            title: '星标件',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/stars')
    },
    {
        path: '/project/oa/email/stars/forwarding',
        name: 'project_oa_email_stars_forwarding',
        meta: {
            title: '星标件转发',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/stars/forwarding'
            )
    },
    {
        path: '/project/oa/email/stars/info',
        name: 'project_oa_email_stars_info',
        meta: {
            title: '星标件详情',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/stars/info')
    },
    {
        path: '/project/oa/email/drafts',
        name: 'project_oa_email_drafts',
        meta: {
            title: '草稿箱',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/drafts')
    },
    {
        path: '/project/oa/email/drafts/reply',
        name: 'project_oa_email_drafts_info',
        meta: {
            title: '草稿箱详情',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/drafts/reply')
    },
    {
        path: '/project/oa/email/dustbin',
        name: 'project_oa_email_dustbin',
        meta: {
            title: '垃圾箱',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/dustbin')
    },
    {
        path: '/project/oa/email/dustbin/reply',
        name: 'project_oa_email_dustbin_reply',
        meta: {
            title: '垃圾箱再次编辑',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/dustbin/reply')
    },
    {
        path: '/project/oa/email/dustbin/forwarding',
        name: 'project_oa_email_dustbin_forwarding',
        meta: {
            title: '垃圾箱转发',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/dustbin/forwarding'
            )
    },
    {
        path: '/project/oa/email/dustbin/info',
        name: 'project_oa_email_dustbin_info',
        meta: {
            title: '垃圾箱详情',
            isProject: true,
            select_path: '/project/oa/email',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/email/dustbin/info')
    }
]
