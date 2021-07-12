export default [{
  path: '/project/oa/accounts/attendance',
  meta: {
    title: '人员考勤',
    prolevel: 3,
    keepAlive: true,
    isProject: true,
    permission: ['OAAttend']
  },
  name: 'project_oa_account_attendance',
  component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/accounts/attendance')
},]