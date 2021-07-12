export default [{
    path: "/project/quality/technology",
    name: "project_quality_technology",
    meta: {
        title: "技术交底",
        prolevel: 2,
        isProject: true,
        icon: "iconfont btn-icon_leftbar_home",
        permission: ["QualityQualityTechConfess"],
    },
    component: () => import(/* webpackChunkName: "project_quality" */ "@/views/enterprise/quality/technology"),
},
{
    path: "/project/quality/technology/handle",
    meta: {
        title: "技术交底新增",
        select_path: "/project/quality/technology",
    },
    name: "project_quality_technology_handle",
    component: () => import(/* webpackChunkName: "project_quality" */ "@/views/enterprise/quality/technology/handle"),
},
];