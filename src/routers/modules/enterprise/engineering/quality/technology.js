export default [{
    path: "/enterprise/quality/technology",
    name: "enterprise_quality_technology",
    meta: {
        title: "技术交底",
        level: 3,
        icon: "iconfont btn-icon_leftbar_home",
        permission: ["QualityQualityTechConfess"],
    },
    component: () => import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/technology"),
},
{
    path: "/enterprise/quality/technology/handle",
    meta: {
        title: "技术交底新增",
        select_path: "/enterprise/quality/technology",
    },
    name: "enterprise_quality_technology_handle",
    component: () => import(/* webpackChunkName: "enterprise_quality" */ "@/views/enterprise/quality/technology/handle"),
},
];