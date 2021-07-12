export default [{
    path: "/enterprise/quality/inspection",
    name: "enterprise_quality_inspection",
    meta: {
        title: "质量巡检",
        level: 3,
        icon: "iconfont btn-icon_leftbar_home",
        permission: ["QuantityDailyInspection"],
    },
    component: () => import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/inspection"),
},
{
    path: "/enterprise/quality/inspection/handle",
    meta: {
        title: "质量巡检新增",
        select_path: "/enterprise/quality/inspection",
    },
    name: "enterprise_quality_inspection_handle",
    component: () => import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/inspection/handle"),
},
];