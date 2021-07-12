import { ViewLayout } from "@/layouts";
export default [{
    path: "/enterprise/wisdom/party",
    meta: {
        title: "党建管理",
        level: 2,
        permission: ["UnionPartyFactionManage", "UnionPartyPersonnelDevelop"],
        icon: "iconfont btn-icon_homepage_menu_05",
    },
    name: "enterprise_wisdom_party",
    component: ViewLayout,
    children: [
        {
            path: "/enterprise/wisdom/party/construction",
            meta: {
                title: "组织建设",
                level: 3,
                permission: ["UnionPartyFactionManage"],
            },
            name: "enterprise_wisdom_party_construction",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        }, {
            path: "/enterprise/wisdom/party/construction/handle",
            meta: {
                title: "新增组织建设",
                select_path: "/enterprise/wisdom/party/construction",
            },
            name: "enterprise_wisdom_party_construction_handle",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/enterprise/wisdom/party/propaganda",
            meta: {
                title: "宣传工作",
                level: 3,
                permission: ["UnionPartyFactionManage"],
            },
            name: "enterprise_wisdom_party_propaganda",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        },
        {
            path: "/enterprise/wisdom/party/propaganda/handle",
            meta: {
                title: "新增宣传工作",
                select_path: "/enterprise/wisdom/party/propaganda",
            },
            name: "enterprise_wisdom_party_propaganda_handle",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/enterprise/wisdom/party/unionWork",
            meta: {
                title: "工会工作",
                level: 3,
                permission: ["UnionPartyFactionManage"],
            },
            name: "enterprise_wisdom_party_unionWork",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        },
        {
            path: "/enterprise/wisdom/party/unionWork/handle",
            meta: {
                title: "新增工会工作",
                select_path: "/enterprise/wisdom/party/unionWork",
            },
            name: "enterprise_wisdom_party_unionWork_handle",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/enterprise/wisdom/party/triple",
            meta: {
                title: "三重一大",
                level: 3,
                permission: ["UnionPartyFactionManage"],
            },
            name: "enterprise_wisdom_party_triple",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        },
        {
            path: "/enterprise/wisdom/party/triple/handle",
            meta: {
                title: "新增三重一大",
                select_path: "/enterprise/wisdom/party/triple",
            },
            name: "enterprise_wisdom_party_triple_handle",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/enterprise/wisdom/party/development",
            meta: {
                title: "党员发展",
                level: 3,
                permission: ["UnionPartyPersonnelDevelop"],
            },
            name: "enterprise_wisdom_party_development",
            component: () =>
                import(
        /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/development"
                ),
        },
        {
            path: "/enterprise/wisdom/party/development/activistList",
            meta: {
                title: "入党积极分子列表",
                select_path: "/enterprise/wisdom/party/development",
                needAlive: true,
            },
            name: "enterprise_wisdom_party_development_activistList",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/development/activistList"
                ),
        },
        {
            path: "/enterprise/wisdom/party/development/prepartList",
            meta: {
                title: "预备党员列表",
                select_path: "/enterprise/wisdom/party/development",
                needAlive: true,
            },
            name: "enterprise_wisdom_party_development_prepartList",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/development/prepartList"
                ),
        },
        {
            path: "/enterprise/wisdom/party/development/regularList",
            meta: {
                title: "正式党员列表",
                select_path: "/enterprise/wisdom/party/development",
                needAlive: true,
            },
            name: "enterprise_wisdom_party_development_regularList",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/development/regularList"
                ),
        },
        {
            path: "/enterprise/wisdom/party/development/prepartList/handle",
            meta: {
                title: "预备党员补充资料",
                select_path: "/enterprise/wisdom/party/development",
            },
            name: "enterprise_wisdom_party_development_prepartList_handle",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/development/prepartList/handle"
                ),
        },
        {
            path:
                "/enterprise/wisdom/party/development/activistList/handle",
            meta: {
                title: "确认入党积极分子",
                select_path: "/enterprise/wisdom/party/development",
            },
            name: "enterprise_wisdom_party_development_activistList_handle",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/development/activistList/handle"
                ),
        },
        {
            path: "/enterprise/wisdom/party/development/activistList/add",
            meta: {
                title: "确认发展对象",
                select_path: "/enterprise/wisdom/party/development",
            },
            name: "enterprise_wisdom_party_development_activistList_add",
            component: () =>
                import(
                /* webpackChunkName: "enterprise_wisdom" */ "@/views/enterprise/wisdom/party/development/activistList/add"
                ),
        },
    ]
}]