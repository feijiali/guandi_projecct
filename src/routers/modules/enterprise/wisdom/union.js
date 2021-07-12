export default [{
    path: "/enterprise/wisdom/union",
    meta: {
        title: "工会管理",
        level: 2,
        secondAlive: true,
        permission: ["Party",],
        icon: "iconfont btn-icon_homepage_menu_06",
    },
    name: "enterprise_wisdom_union",
    component: () => import(/* webpackChunkName: "enterprise_union" */ "@/views/enterprise/wisdom/union"),
},
//---------------------------------------困难职工公示-------------------------------------------
{
    path: "/enterprise/wisdom/union/hardworkers/publicityList",
    meta: {
        title: "公示列表",
        select_path: "/enterprise/wisdom/union",
    },
    name: "enterprise_wisdom_union_hardworkers_publicityList",
    component: () =>
        import(
        /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/union/hardworkers/publicityList"
        ),
},
//---------------------------------------特困，重困，一般职工列表-------------------------------------------
{
    path: "/enterprise/wisdom/union/hardworkers/confirm",
    meta: {
        title: "职工列表",
        select_path: "/enterprise/wisdom/union",
    },
    name: "enterprise_wisdom_union_hardworkers_confirm",
    component: () =>
        import(
      /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/union/hardworkers/confirm"
        ),
},
//---------------------------------------金秋助学公示-------------------------------------------
{
    path: "/enterprise/wisdom/union/unionPartySubsidy/publicityList",
    meta: {
        title: "公示列表",
        select_path: "/enterprise/wisdom/union",
    },
    name: "enterprise_wisdom_union_unionPartySubsidy_publicityList",
    component: () =>
        import(
        /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/union/unionPartySubsidy/publicityList"
        ),
},
//---------------------------------------金秋助学列表-------------------------------------------
{
    path: "/enterprise/wisdom/union/unionPartySubsidy/confirm",
    meta: {
        title: "职工列表",
        select_path: "/enterprise/wisdom/union",
    },
    name: "enterprise_wisdom_union_unionPartySubsidy_confirm",
    component: () =>
        import(
      /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/union/unionPartySubsidy/confirm"
        ),
},]