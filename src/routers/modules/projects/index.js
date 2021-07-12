/*
 * @Autor: 邓易
 * @Date: 2021-02-05 17:38:38
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-24 16:09:46
 */
import home2 from "./home2";
import oaManage from "./oaManage";
// 质量管理
import monthReport from "./engineering/monthReport";  //联动月报表
import scheduleManagement from "./engineering/scheduleManagement"; //进度管理
import fileManagement from "./engineering/fileManagement"; //文件管理
import contract from "./engineering/contract"; //合同管理
import quality from "./engineering/quality"; //质量管理
import bim from "./engineering/bim"; //BIM
import advancedGeology from "./engineering/advancedGeology";//超前地质预报
import measurement from "./engineering/measurement";//监控量测
import changeStanding from "./engineering/changeStanding"; //变更台账
import metering from "./engineering/metering"; //计量管理
import costCalculation from "./engineering/costCalculation"; //成本测算
import projectsInfo from "./engineering/projectsInfo"; //项目信息

import safety3 from "./safety3";
import wisdom from './wisdom'

import news from "./news";
import approval from "./approval";
import messageConfig from "./messageConfig";
import organization from "./organization";
import backstage from "./backstage";
import authority from "./authority";
import weekSetting from "./weekSetting";
import { BasicLayoutProject } from "@/layouts";
import material2 from "./material2";



const isMixin =
  process.env.VUE_APP_MODE == "mixin" ||
  process.env.VUE_APP_MODE == "mixin_dev" ||
  process.env.VUE_APP_MODE == "guandi_dev";
const Routes = [
  {
    path: "/project",
    name: "project",
    component: BasicLayoutProject,
    meta: {
      title: "项目级",
      prolevel: 0,
    },
    redirect: { name: "project_summary" },
    children: [
      ...messageConfig,
      ...news,
      ...approval,
      ...backstage,
      ...organization,
      ...authority,
      ...weekSetting,
      ...home2,
      ...oaManage,
      ...monthReport,
      ...scheduleManagement,
      ...fileManagement,
      ...contract,
      ...quality,
      ...bim,
      ...advancedGeology,
      ...measurement,
      ...changeStanding, ...metering,
      ...safety3,
      ...wisdom,
      ...material2,
      ...costCalculation,
      ...projectsInfo,
      
    ],
  },
];
export default Routes;
