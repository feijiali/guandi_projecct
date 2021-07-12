import { SubmenuLayout } from "@/layouts";

export default [{
    path: "/enterprise/oa/accounts/attendance2",
    meta: {
        title: "人员打卡",
        level: 3,
        permission: ["StaffPunchAttendanceModule"],
        needAlive: true,
    },
    name: "enterprise_oa_account_attendance2",
    component: SubmenuLayout,
    children: [
        {
            path: '/enterprise/oa/accounts/attendance2/punchclock',
            meta: {
                title: '人员打卡',
                permission: ["StaffPunchAttendance", "StaffPunchBasic"],
                level: 4,
                keepAlive: true,
                select_path: '/enterprise/oa/accounts/attendance2',
            },
            name: 'enterprise_oa_account_attendance2_punchclock',
            component: () =>
                import(
            /* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/oa/accounts/attendance2/punchclock'
                )
        }, {
            path: "/enterprise/oa/accounts/attendance2/configurelist",
            name: "enterprise_oa_accounts_attendance2_configurelist",
            meta: {
                title: "考勤参数配置",
                keepAlive: true,
                islevel: true,
                select_path: "/enterprise/oa/accounts/attendance2"
            },
            component: () =>
                import(
            /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/attendance2/punchclock/configurelist"
                )
        },
        {
            path: "/enterprise/oa/accounts/attendance2/configureadd",
            name: "enterprise_oa_accounts_attendance2_configureadd",
            meta: {
                title: "新增人员打卡设置规则",
                select_path: "/enterprise/oa/accounts/attendance2"
            },
            component: () =>
                import(
            /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/attendance2/punchclock/configureadd"
                )
        },
        {
            path: "/enterprise/oa/accounts/attendance2/outattendance",
            name: "enterprise_oa_accounts_attendance2_outattendance",
            meta: {
                title: "出勤表",
                keepAlive: true,
                islevel: true,
                select_path: "/enterprise/oa/accounts/attendance2"
            },
            component: () =>
                import(
            /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/attendance2/punchclock/outattendance"
                )
        },
        {
            path: "/enterprise/oa/accounts/attendance2/change",
            meta: {
                title: "异动人员",
                level: 4,
                keepAlive: true,
                permission: ["StaffPunchAttendance"],
                select_path: "/enterprise/oa/accounts/attendance2"
            },
            name: "enterprise_oa_accounts_attendance2_change",
            component: () =>
                import(
            /* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/attendance2/change"
                )
        }]
},]