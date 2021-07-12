export default [{
  path: '/enterprise/oa/accounts/salary',
  meta: {
    title: '考勤工资',
    level: 3,
    needAlive: true,
    permission: ['OAAttendanceWage']
  },
  name: 'enterprise_oa_account_salary',
  component: () => import(/* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/oa/accounts/salary')
},
{
  path: '/enterprise/oa/accounts/salary/handle',
  meta: {
    title: '考勤工资',
    select_path: '/enterprise/oa/accounts/salary'
  },
  name: 'enterprise_oa_account_salary_handle',
  component: () =>
    import(/* webpackChunkName: "enterprise_oa" */ '@/views/enterprise/oa/accounts/salary/handle')
},]