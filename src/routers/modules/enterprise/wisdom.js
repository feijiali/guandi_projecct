import { MenuLayout, ViewLayout, SubmenuLayout } from "@/layouts";
import party from "./wisdom/party"; //工会管理
import union from "./wisdom/union"; //党建管理

export default [
    {
        path: "/enterprise/wisdom",
        name: "enterprise_wisdom",
        meta: {
            title: "工会党建",
            level: 1,
            permission: ["PartyUnion"],
        },
        component: MenuLayout,
        children: [
            ...union,
            ...party,
        ],
    },
];
