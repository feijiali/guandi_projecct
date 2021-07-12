export default [{
    path: "/project/wisdom/union",
    meta: {
        title: "工会管理",
        needAlive: true,
        prolevel: 2,
        isProject: true,
        permission: ["Party",],
        icon: "iconfont icon-icon_homepage_menu_06",
    },
    name: "project_wisdom_union",
    component: () => import(/* webpackChunkName: "enterprise_union" */ "@/views/enterprise/wisdom/union"),
},
//---------------------------------------困难职工公示-------------------------------------------
{
    path: "/project/wisdom/union/hardworkers/publicityList",
    meta: {
        title: "公示列表",
        isProject: true,
        select_path: "/project/wisdom/union",
    },
    name: "project_wisdom_union_hardworkers_publicityList",
    component: () =>
        import(
        /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/union/hardworkers/publicityList"
        ),
},
//---------------------------------------特困，重困，一般职工列表-------------------------------------------
{
    path: "/project/wisdom/union/hardworkers/confirm",
    meta: {
        title: "职工列表",
        isProject: true,
        select_path: "/project/wisdom/union",
    },
    name: "project_wisdom_union_hardworkers_confirm",
    component: () =>
        import(
      /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/union/hardworkers/confirm"
        ),
},
//---------------------------------------金秋助学公示-------------------------------------------
{
    path: "/project/wisdom/union/unionPartySubsidy/publicityList",
    meta: {
        title: "公示列表",
        isProject: true,
        select_path: "/project/wisdom/union",
    },
    name: "project_wisdom_union_unionPartySubsidy_publicityList",
    component: () =>
        import(
        /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/union/unionPartySubsidy/publicityList"
        ),
},
//---------------------------------------金秋助学列表-------------------------------------------
{
    path: "/project/wisdom/union/unionPartySubsidy/confirm",
    meta: {
        title: "职工列表",
        isProject: true,
        select_path: "/project/wisdom/union",
    },
    name: "project_wisdom_union_unionPartySubsidy_confirm",
    component: () =>
        import(
      /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/union/unionPartySubsidy/confirm"
        ),
},]