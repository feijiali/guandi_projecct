export default [{
    path: "/enterprise/quality/takecoverEngineering",
    name: "enterprise_quality_takecoverEngineering",
    meta: {
        title: "隐蔽工程验收",
        level: 3,
        icon: "iconfont btn-icon_leftbar_home",
        permission: ["QualityProcessInspection"],
    },
    component: () => import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/takecoverEngineering"),
},
{
    path: "/enterprise/quality/takecoverEngineering/handle",
    meta: {
        title: "隐蔽工程验收新增",
        select_path: "/enterprise/quality/takecoverEngineering",
    },
    name: "enterprise_quality_takecoverEngineering_handle",
    component: () => import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/takecoverEngineering/handle"),
},
];