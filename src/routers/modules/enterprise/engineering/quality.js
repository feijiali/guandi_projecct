import { MenuLayout, ViewLayout, SubmenuLayout } from "@/layouts";
import inspection from "./quality/inspection"; //质量巡检
import takecoverEngineering from "./quality/takecoverEngineering"; //隐蔽工程验收
import technology from "./quality/technology"; //技术交底
// import testManagementTip from "./quality/testManagementTip"; //试验管理
export default [
    {
        path: "/enterprise/quality",
        name: "enterprise_quality",
        meta: {
            title: "质量管理",
            level: 2,
            permission: ["quality"],
            icon: "iconfont btn-icon_homepage_menu_13",
        },
        component: ViewLayout,
        children: [
            ...inspection,
            ...takecoverEngineering,
            ...technology
            // ...testManagementTip,
        ],
    },
];
