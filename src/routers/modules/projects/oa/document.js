export default [
    {
        path: '/project/oa/document/write',
        name: 'project_oa_document_write',
        meta: {
            title: '发文拟稿',
            select_path: '/project/oa/document',
            isProject: true,
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/write')
    },
    {
        path: '/project/oa/document/draft',
        name: 'project_oa_document_draft',
        meta: {
            title: '草稿箱',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/draft')
    },
    {
        path: '/project/oa/document/draft/edit',
        name: 'project_oa_document_draft_edit',
        meta: {
            title: '草稿箱编辑',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/draft/edit')
    },
    {
        path: '/project/oa/document/myPost',
        name: 'project_oa_document_myPost',
        meta: {
            title: '我的发文',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/myPost')
    },
    {
        path: '/project/oa/document/myPost/info',
        name: 'project_oa_document_myPost_info',
        meta: {
            title: '我的发文详情',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/myPost/info'
            )
    },
    {
        path: '/project/oa/document/myPost/undo',
        name: 'project_oa_document_myPost_undo',
        meta: {
            title: '我的发文撤销',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/myPost/undo'
            )
    },
    {
        path: '/project/oa/document/myPost/edit',
        name: 'project_oa_document_myPost_edit',
        meta: {
            title: '我的发文编辑',
            isProject: true,
            select_path: '/project/oa/document',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/myPost/edit'
            )
    },
    {
        path: '/project/oa/document/commission',
        name: 'project_oa_document_commission',
        meta: {
            title: '待办发文',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/commission')
    },
    {
        path: '/project/oa/document/commission/info',
        name: 'project_oa_document_commission_info',
        meta: {
            title: '待办发文详情',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/commission/info'
            )
    },
    {
        path: '/project/oa/document/done',
        name: 'project_oa_document_done',
        meta: {
            title: '已办发文',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/done')
    },
    {
        path: '/project/oa/document/done/info',
        name: 'project_oa_document_done_info',
        meta: {
            title: '已办发文详情',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/done/info')
    },
    {
        path: '/project/oa/document/addressee',
        name: 'project_oa_document_addressee',
        meta: {
            title: '我的收文',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/addressee')
    },
    {
        path: '/project/oa/document/addressee/info',
        name: 'project_oa_document_addressee_info',
        meta: {
            title: '我的收文详情',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/addressee/info'
            )
    },
    {
        path: '/project/oa/document/addressee/reply',
        name: 'project_oa_document_addressee_reply',
        meta: {
            title: '我的收文回复',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/addressee/reply'
            )
    },
    {
        path: '/project/oa/document/monitor',
        name: 'project_oa_document_monitor',
        meta: {
            title: '公文监控',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(/* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/monitor')
    },
    {
        path: '/project/oa/document/monitor/info',
        name: 'project_oa_document_monitor_info',
        meta: {
            title: '公文监控详情',
            isProject: true,
            select_path: '/project/oa/document',
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/monitor/info'
            )
    },
    {
        path: '/project/oa/document/monitor/reply_detail',
        name: 'project_oa_document_monitor_reply_detail',
        meta: {
            title: '处理人回复',
            isProject: true,
            select_path: '/project/oa/document',
            permission: ['OAAllocation'],
            icon: 'iconfont btn-icon_leftbar_information'
        },
        component: () =>
            import(
                /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/document/monitor/reply_detail'
            )
    }
]
