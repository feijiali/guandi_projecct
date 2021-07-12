export default [{
  path: '/project/oa/accounts/salary',
  meta: {
    title: '考勤工资',
    isProject: true,
    keepAlive: true,
    prolevel: 3,
    permission: ['OAAttendanceWage']
  },
  name: 'project_oa_account_salary',
  component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/accounts/salary')
},
{
  path: '/project/oa/accounts/salary/handle',
  meta: {
    title: '考勤工资',
    isProject: true,
    select_path: '/project/oa/accounts'
  },
  name: 'project_oa_account_salary_handle',
  component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/accounts/salary/handle')
},]