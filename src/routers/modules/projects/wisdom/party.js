import { SubmenuLayoutProject } from "@/layouts";
export default [{
    path: "/project/wisdom/party",
    meta: {
        title: "党建管理",
        needAlive: true,
        prolevel: 2,
        isProject: true,
        permission: ["UnionPartyFactionManage", "UnionPartyPersonnelDevelop"],
    },
    name: "project_wisdom_party",
    component: SubmenuLayoutProject,
    children: [
        {
            path: "/project/wisdom/party/construction",
            meta: {
                title: "组织建设",
                prolevel: 3,
                keepAlive: true,
                select_path: '/project/wisdom/party',
                isProject: true,
                permission: ["UnionPartyFactionManage"],
            },
            name: "project_wisdom_party_construction",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        }, {
            path: "/project/wisdom/party/construction/handle",
            meta: {
                title: "新增组织建设",
                isProject: true,
                select_path: "/project/wisdom/party/construction",
            },
            name: "project_wisdom_party_construction_handle",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/project/wisdom/party/propaganda",
            meta: {
                title: "宣传工作",
                prolevel: 3,
                keepAlive: true,
                select_path: '/project/wisdom/party',
                isProject: true,
                permission: ["UnionPartyFactionManage"],
            },
            name: "project_wisdom_party_propaganda",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        },
        {
            path: "/project/wisdom/party/propaganda/handle",
            meta: {
                title: "新增宣传工作",
                isProject: true,
                select_path: "/project/wisdom/party/propaganda",
            },
            name: "project_wisdom_party_propaganda_handle",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/project/wisdom/party/unionWork",
            meta: {
                title: "工会工作",
                prolevel: 3,
                keepAlive: true,
                select_path: '/project/wisdom/party',
                isProject: true,
                permission: ["UnionPartyFactionManage"],
            },
            name: "project_wisdom_party_unionWork",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        },
        {
            path: "/project/wisdom/party/unionWork/handle",
            meta: {
                title: "新增工会工作",
                isProject: true,
                select_path: "/project/wisdom/party",
            },
            name: "project_wisdom_party_unionWork_handle",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/project/wisdom/party/triple",
            meta: {
                title: "三重一大",
                prolevel: 3,
                keepAlive: true,
                select_path: '/project/wisdom/party',
                isProject: true,
                permission: ["UnionPartyFactionManage"],
            },
            name: "project_wisdom_party_triple",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction"
                ),
        },
        {
            path: "/project/wisdom/party/triple/handle",
            meta: {
                title: "新增三重一大",
                isProject: true,
                select_path: "/project/wisdom/party",
            },
            name: "project_wisdom_party_triple_handle",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/construction/handle"
                ),
        },
        {
            path: "/project/wisdom/party/development",
            meta: {
                title: "党员发展",
                prolevel: 3,
                keepAlive: true,
                select_path: '/project/wisdom/party',
                isProject: true,
                permission: ["UnionPartyPersonnelDevelop"],
            },
            name: "project_wisdom_party_development",
            component: () =>
                import(
        /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/development"
                ),
        },
        {
            path: "/project/wisdom/party/development/activistList",
            meta: {
                title: "入党积极分子列表",
                isProject: true,
                select_path: "/project/wisdom/party",
                keepAlive: true,
            },
            name: "project_wisdom_party_development_activistList",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/development/activistList"
                ),
        },
        {
            path: "/project/wisdom/party/development/prepartList",
            meta: {
                title: "预备党员列表",
                isProject: true,
                select_path: "/project/wisdom/party",
                keepAlive: true,
            },
            name: "project_wisdom_party_development_prepartList",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/development/prepartList"
                ),
        },
        {
            path: "/project/wisdom/party/development/regularList",
            meta: {
                title: "正式党员列表",
                isProject: true,
                select_path: "/project/wisdom/party",
                keepAlive: true,
            },
            name: "project_wisdom_party_development_regularList",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/development/regularList"
                ),
        },
        {
            path: "/project/wisdom/party/development/prepartList/handle",
            meta: {
                title: "预备党员补充资料",
                isProject: true,
                select_path: "/project/wisdom/party",
            },
            name: "project_wisdom_party_development_prepartList_handle",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/development/prepartList/handle"
                ),
        },
        {
            path:
                "/enterprise/wisdom/party/development/activistList/handle",
            meta: {
                title: "确认入党积极分子",
                isProject: true,
                select_path: "/project/wisdom/party",
            },
            name: "project_wisdom_party_development_activistList_handle",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/development/activistList/handle"
                ),
        },
        {
            path: "/project/wisdom/party/development/activistList/add",
            meta: {
                title: "确认发展对象",
                isProject: true,
                select_path: "/project/wisdom/party",
            },
            name: "project_wisdom_party_development_activistList_add",
            component: () =>
                import(
                /* webpackChunkName: "project_wisdom" */ "@/views/enterprise/wisdom/party/development/activistList/add"
                ),
        },
    ]
}]