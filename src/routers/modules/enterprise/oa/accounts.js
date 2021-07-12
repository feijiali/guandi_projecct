export default [{
    path: "/enterprise/oa/accounts/personInfo",
    meta: {
        title: "人员信息",
        level: 3,
        permission: ["Account"],
        needAlive: true,
    },
    name: "enterprise_oa_account_personInfo",
    component: () =>
        import(/* webpackChunkName: "enterprise_oa" */ "@/views/enterprise/oa/accounts/personInfo"),
},
{
    path: "/enterprise/oa/accounts/personInfo/handle",
    name: "enterprise_oa_account_personInfo_handle",
    meta: {
        title: "人员信息",
        select_path: "/enterprise/oa/accounts/personInfo",
    },
    component: () =>
        import(
        /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/oa/accounts/personInfo/handle"
        ),
},{
    path: "/enterprise/oa/accounts/personInfo/handle",
    name: "enterprise_oa_account_personInfo_handle",
    meta: {
      title: "人员信息",
      select_path: "/enterprise/oa/accounts/personInfo",
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/oa/accounts/personInfo/handle"
      ),
  },{
    path: "/enterprise/oa/accounts/personInfo/threePerson",
    name: "enterprise_oa_account_personInfo_threePerson",
    meta: {
      title: "三类人员",
      select_path: "/enterprise/oa/accounts/personInfo",
    },
    component: () =>
      import(
        /* webpackChunkName: "enterprise_engineering" */ "@/views/enterprise/oa/accounts/personInfo/threePerson"
      ),
  },]