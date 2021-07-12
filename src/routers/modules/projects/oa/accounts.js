export default [{
  path: '/project/oa/accounts/personInfo',
  meta: {
    title: '人员信息',
    prolevel: 3,
    keepAlive: true,
    select_path: '/project/oa/accounts',
    isProject: true,
    permission: ['Account']
  },
  name: 'project_oa_account_personInfo',
  component: () => import(/* webpackChunkname: "project_oa" */ '@/views/enterprise/oa/accounts/personInfo')
},
{
  path: '/project/oa/accounts/personInfo/handle',
  name: 'project_oa_account_personInfo_handle',
  meta: {
    title: '人员信息',
    select_path: '/project/oa/accounts',
    isProject: true
  },
  component: () =>
    import(
      /* webpackChunkName: "enterprise_engineering" */ '@/views/enterprise/oa/accounts/personInfo/handle'
    )
},
{
  path: "/project/oa/accounts/personInfo/threePerson",
  name: "project_oa_account_personInfo_threePerson",
  meta: {
    title: "三类人员",
    select_path: "/project/oa/accounts",
  },
  component: () =>
    import(
      /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/oa/accounts/personInfo/threePerson"
    ),
},]