export default [{
    path: "/project/quality/takecoverEngineering",
    name: "project_quality_takecoverEngineering",
    meta: {
        title: "隐蔽工程验收",
        prolevel: 2,
        isProject: true,
        icon: "iconfont btn-icon_leftbar_home",
        permission: ["QualityProcessInspection"],
    },
    component: () => import(/* webpackChunkName: "project_quality" */ "@/views/enterprise/quality/takecoverEngineering"),
},
{
    path: "/project/quality/takecoverEngineering/handle",
    meta: {
        title: "隐蔽工程验收新增",
        select_path: "/project/quality/takecoverEngineering",
    },
    name: "project_quality_takecoverEngineering_handle",
    component: () => import(/* webpackChunkName: "project_quality" */ "@/views/enterprise/quality/takecoverEngineering/handle"),
},
];