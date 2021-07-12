export default [{
  path: "/enterprise/oa/accounts/attendance",
  meta: {
    title: "人员考勤",
    level: 3,
    needAlive: true,
    permission: ["OAAttend"],
  },
  name: "enterprise_oa_account_attendance",
  component: () =>
    import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/attendance"),
},]