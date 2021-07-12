import { MenuLayout } from '@/layouts';
import monthReport from "./engineering/monthReport"; //联动月报表
import scheduleManagement from "./engineering/scheduleManagement"; //进度管理
import fileManagement from "./engineering/fileManagement"; //文件管理

import contract from "./engineering/contract"; //合同管理
import quality from "./engineering/quality"; //质量管理
import advancedGeology from "./engineering/advancedGeology"; //超前地质预报
import measurement from "./engineering/measurement"; //监控量测
import changeStanding from "./engineering/changeStanding"; //变更台账
import bim from "./engineering/bim"; //bim

import metering from "./engineering/metering"; //计量管理
import costCalculation from "./engineering/costCalculation"; //成本测算
import projectInfor from "./engineering/projectInfor"; //项目信息




export default [
  {
    path: '/enterprise/engineering',
    name: 'enterprise_engineering',
    meta: {
      title: '工程管理',
      level: 1,
      permission: ['engineeringManageAbstract']
    },
    component: MenuLayout,
    children: [
      ...monthReport,
      ...scheduleManagement,
      ...fileManagement,
      ...contract,
      ...quality,
      ...advancedGeology,
      ...measurement,
      ...changeStanding,
      ...bim,

      ...metering,
      ...costCalculation,
      ...projectInfor,

    ]
  }]
