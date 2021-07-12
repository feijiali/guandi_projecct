export default [{
    path: "/project/quality/inspection",
    name: "project_quality_inspection",
    meta: {
        title: "质量巡检",
        prolevel: 2,
        isProject: true,
        icon: "iconfont btn-icon_leftbar_home",
        permission: ["QuantityDailyInspection"],
    },
    component: () => import(/* webpackChunkName: "project_quality" */ "@/views/enterprise/quality/inspection"),
},
{
    path: "/project/quality/inspection/handle",
    meta: {
        title: "质量巡检新增",
        select_path: "/project/quality/inspection",
    },
    name: "project_quality_inspection_handle",
    component: () => import(/* webpackChunkName: "project_quality" */ "@/views/enterprise/quality/inspection/handle"),
},
//日常巡检整改与复检
{
    path: "/project/quality/inspection/Reply",
    name: "project_quality_inspection_Reply",
    meta: {
        select_path: "/project/quality/inspection",
        isProject: true,
    },
    component: () =>
        import(/* webpackChunkName: "project_quality" */ "@/views/enterprise/quality/inspection/Reply.vue"),
},
];