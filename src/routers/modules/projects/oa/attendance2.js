import { SubmenuLayout } from "@/layouts";

export default [
    {
        path: '/project/oa/accounts/attendance2/punchclock',
        meta: {
            title: '人员打卡',
            prolevel: 3,
            keepAlive: true,
            isProject: true,
            permission: ["StaffPunchAttendance", "StaffPunchBasic"],
        },
        name: 'project_oa_account_attendance2_punchclock',
        component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/accounts/attendance2/punchclock')
    },
    {
        path: '/project/oa/accounts/attendance2/configurelist',
        name: 'project_oa_accounts_attendance2_configurelist',
        meta: {
            title: '考勤参数配置',
            select_path: '/project/oa/accounts',
            isProject: true
        },
        component: () =>
            import(
            /* webpackChunkName: "project_oa" */ '@/views/enterprise/oa/accounts/attendance2/punchclock/configurelist'
            )
    },
    {
        path: "/project/oa/accounts/attendance2/configureadd",
        name: "project_oa_accounts_attendance2_configureadd",
        meta: {
            isProject: true,
            title: "新增人员打卡设置规则",
            select_path: '/project/oa/accounts',
        },
        component: () =>
            import(
    /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/attendance2/punchclock/configureadd"
            )
    },
    {
        path: "/project/oa/accounts/attendance2/outattendance",
        name: "project_oa_accounts_attendance2_outattendance",
        meta: {
            title: "出勤表",
            keepAlive: true,
            islevel: true,
            permission: ['Account'],
            select_path: '/project/oa/accounts',
        },
        component: () =>
            import(
    /* webpackChunkName: "project_oa" */ "@/views/enterprise/oa/accounts/attendance2/punchclock/outattendance"
            )
    },]