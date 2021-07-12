import { ViewLayout } from "@/layouts";
import party from "./wisdom/party"; //工会管理
import union from "./wisdom/union"; //党建管理

export default [
    {
        path: "/project/wisdom",
        name: "project_wisdom",
        meta: {
            title: "工会党建",
            prolevel: 1,
            isProject: true,
            permission: ["PartyUnion"],
            icon: 'iconfont btn-icon_homepage_menu_05',
        },
        component: ViewLayout,
        children: [
            ...union,
            ...party,
        ],
    },
];
