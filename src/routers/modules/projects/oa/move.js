export default [{
  path: '/project/oa/accounts/attendance2/change',
  meta: {
    title: '异动人员',
    prolevel: 3,
    keepAlive: true,
    isProject: true,
    permission: ["StaffPunchAttendance"],
  },
  name: 'project_oa_accounts_attendance2_change',
  component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/accounts/attendance2/change')
}]