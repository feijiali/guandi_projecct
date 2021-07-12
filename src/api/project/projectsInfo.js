import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

// 项目信息
export default {
  queryFilesSiteInfo(data) {
    return postRequest(baseUrl + 'QueryFilesSiteInfo', data);
  },
  /*********************项目信息***********************/
  // 查询项目基本信息(QueryProjectInfoProject)
  QueryProjectInfoProject(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProject', data);
  },
  // 删除项目基本信息
  delProjectInfoProject(data) {
    return postRequest(baseUrl + 'DelProjectInfoProject', data);
  },
  // 修改项目基本信息(UpdateProjectInfoProject)
  UpdateProjectInfoProject(data) {
    return postRequest(baseUrl + 'UpdateProjectInfoProject', data);
  },
  // 上传项目基本信息
  UploadProjectInfoProject(data) {
    return postRequest(baseUrl + 'UploadProjectInfoProject', data);
  },

  // 上传单位工程
  UploadTunnelUnitProj(data) {
    return postRequest(baseUrl + 'UploadTunnelUnitProj', data);
  },
  // 修改单位工程
  UpdateTunnelUnitProj(data) {
    return postRequest(baseUrl + 'UpdateTunnelUnitProj', data);
  },
  // 删除单位工程
  DelTunnelUnitProj(data) {
    return postRequest(baseUrl + 'DelTunnelUnitProj', data);
  },
  // 查询单位工程
  queryTunnelUnitProj(data) {
    return postRequest(baseUrl + 'QueryTunnelUnitProj', data);
  },
  // 查询单位工程及子单位工程
  queryTunnelUnitAndSubUnit(data) {
    return postRequest(baseUrl + 'QueryTunnelUnitAndSubUnit', data);
  },
  // 查询隧道单位工程和子单位工程
  queryAllUnitProjectInfo(data) {
    return postRequest(baseUrl + 'QueryAllUnitProjectInfo', data);
  },
  // 上传子单位工程
  UploadTunnelSubUnitAndBuildPart(data) {
    return postRequest(baseUrl + 'UploadTunnelSubUnitAndBuildPart', data);
  },
  // 修改子单位工程
  UpdateTunnelSubUnitAndBuildPart(data) {
    return postRequest(baseUrl + 'UpdateTunnelSubUnitAndBuildPart', data);
  },
  // 查询子单位工程及部件
  QueryTunnelSubUnitAndBuildPart(data) {
    return postRequest(baseUrl + 'QueryTunnelSubUnitAndBuildPart', data);
  },
  // 查询子单位工程
  QueryTunnelSubUnit(data) {
    return postRequest(baseUrl + 'QueryTunnelSubUnit', data);
  },
  // 删除子单位工程
  DelTunnelSubUnitAndBuildPart(data) {
    return postRequest(baseUrl + 'DelTunnelSubUnitAndBuildPart', data);
  },

  // 上传围岩等级
  UploadTunnelRock(data) {
    return postRequest(baseUrl + 'UploadTunnelRock', data);
  },
  // 修改围岩等级
  UpdateTunnelRock(data) {
    return postRequest(baseUrl + 'UpdateTunnelRock', data);
  },
  // 查询围岩等级
  QueryTunnelRock(data) {
    return postRequest(baseUrl + 'QueryTunnelRock', data);
  },
  // 查询围岩等级和衬砌类型
  QueryTunnelRockAndLining(data) {
    return postRequest(baseUrl + 'QueryTunnelRockAndLining', data);
  },
  // 删除围岩等级
  DelTunnelRock(data) {
    return postRequest(baseUrl + 'DelTunnelRock', data);
  },
  // 上传衬砌
  UploadTunnelLining(data) {
    return postRequest(baseUrl + 'UploadTunnelLining', data);
  },
  // 修改衬砌
  UpdateTunnelLining(data) {
    return postRequest(baseUrl + 'UpdateTunnelLining', data);
  },
  // 查询衬砌
  QueryTunnelLining(data) {
    return postRequest(baseUrl + 'QueryTunnelLining', data);
  },
  // 查询衬砌类型
  QueryTunnelLiningSort(data) {
    return postRequest(baseUrl + 'QueryTunnelLiningSort', data);
  },
  // 衬砌辅助工程措施
  QueryTunnelLiningAssist(data) {
    return postRequest(baseUrl + 'QueryTunnelLiningAssist', data);
  },
  // 删除衬砌
  DelTunnelLining(data) {
    return postRequest(baseUrl + 'DelTunnelLining', data);
  },
  //查询施工部位
  QueryTunnelBuild(data) {
    return postRequest(baseUrl + 'QueryTunnelBuild', data);
  },
  // 上传预埋件
  UploadTunnelEmbedded(data) {
    return postRequest(baseUrl + 'UploadTunnelEmbedded', data);
  },
  // 修改预埋件
  UpdateTunnelEmbedded(data) {
    return postRequest(baseUrl + 'UpdateTunnelEmbedded', data);
  },
  // 查询预埋件
  QueryTunnelEmbedded(data) {
    return postRequest(baseUrl + 'QueryTunnelEmbedded', data);
  },
  // 删除预埋件
  DelTunnelEmbedded(data) {
    return postRequest(baseUrl + 'DelTunnelEmbedded', data);
  },
  // 上传预埋件提醒
  UploadTunnelEmbeddedSet(data) {
    return postRequest(baseUrl + 'UploadTunnelEmbeddedSet', data);
  },
  // 修改预埋件提醒
  UpdateTunnelEmbeddedSet(data) {
    return postRequest(baseUrl + 'UpdateTunnelEmbeddedSet', data);
  },
  // 查询预埋件提醒
  DelTunnelEmbeddedSet(data) {
    return postRequest(baseUrl + 'DelTunnelEmbeddedSet', data);
  },
  // 删除预埋件提醒
  QueryTunnelEmbeddedSet(data) {
    return postRequest(baseUrl + 'QueryTunnelEmbeddedSet', data);
  },
  //----------------------------------路基--------------------------------
  // 查询路基单位工程
  queryRoadUnitProject(data) {
    return postRequest(baseUrl + 'QueryRoadUnitProject', data);
  },
  // 查询路基单位工程-列表
  queryRoadUnitProjectList(data) {
    return postRequest(baseUrl + 'QueryRoadUnitProjectList', data);
  },
  // 删除路基单位工程
  delRoadUnitProject(data) {
    return postRequest(baseUrl + 'DelRoadUnitProject', data);
  },
  // 修改路基单位工程
  updateRoadUnitProject(data) {
    return postRequest(baseUrl + 'UpdateRoadUnitProject', data);
  },
  // 上传路基单位工程
  uploadRoadUnitProject(data) {
    return postRequest(baseUrl + 'UploadRoadUnitProject', data);
  },

  // 查询所有子单元工程及施工部位(QuerySubUnitUnionAndPart)
  querySubUnitUnionAndPart(data) {
    return postRequest(baseUrl + 'QuerySubUnitUnionAndPart', data);
  },

  // 上传详情细目
  UploadQuantitiesItem(data) {
    return postRequest(baseUrl + 'UploadQuantitiesItem', data);
  },
  // 修改详情细目
  UpdateQuantitiesItem(data) {
    return postRequest(baseUrl + 'UpdateQuantitiesItem', data);
  },

  // 删除章节
  DelQuantitiesChapter(data) {
    return postRequest(baseUrl + 'DelQuantitiesChapter', data);
  },
  // 查询章节
  QueryQuantitiesChapter(data) {
    return postRequest(baseUrl + 'QueryQuantitiesChapter', data);
  },
  // 删除详情细目
  DelQuantitiesItem(data) {
    return postRequest(baseUrl + 'DelQuantitiesItem', data);
  },
  // 查询详情细目
  QueryQuantitiesItem(data) {
    return postRequest(baseUrl + 'QueryQuantitiesItem', data);
  },
  // 查询工程量清单的所有章节定义
  QueryQuantitiesChapterNum(data) {
    return postRequest(baseUrl + 'QueryQuantitiesChapterNum', data);
  },
  // 导入详情细目
  ImportQuantitiesItem(data) {
    return postRequest(baseUrl + 'ImportQuantitiesItem', data);
  },
  // 导出详情细目
  ExportQuantitiesItem(data) {
    return postRequest(baseUrl + 'ExportQuantitiesItem', data);
  },

  //隧道
  // 查询单位工程量信息
  QueryTunnelEngineerInfo(data) {
    return postRequest(baseUrl + 'QueryTunnelEngineerInfo', data);
  },
  // 查询单位工程量表格-
  QueryTunnelEngineerTableList(data) {
    return postRequest(baseUrl + 'QueryTunnelEngineerTableList', data);
  },
  // 删除单位工程量表格
  DelTunnelEngineerTable(data) {
    return postRequest(baseUrl + 'DelTunnelEngineerTable', data);
  },
  // 导入单位工程量表格
  ImportTunnelEngineerTable(data) {
    return postRequest(baseUrl + 'ImportTunnelEngineerTable', data);
  },
  // 导入单位工程量表格
  ReImportTunnelEngineerTable(data) {
    return postRequest(baseUrl + 'ReImportTunnelEngineerTable', data);
  },
  // 修改单位工程量表格
  UpdateTunnelEngineerTable(data) {
    return postRequest(baseUrl + 'UpdateTunnelEngineerTable', data);
  },

  //桥梁
  // 查询单位工程量
  QueryBridgeQuantities(data) {
    return postRequest(baseUrl + 'QueryBridgeQuantities', data);
  },
  // 查询单位工程量明细-筛选项
  QueryBridgeQuantitiesItemSelect(data) {
    return postRequest(baseUrl + 'QueryBridgeQuantitiesItemSelect', data);
  },
  // 查询单位工程量明细
  QueryBridgeQuantitiesItem(data) {
    return postRequest(baseUrl + 'QueryBridgeQuantitiesItem', data);
  },
  // 导入单位工程量明细
  ImportBridgeQuantitiesItem(data) {
    return postRequest(baseUrl + 'ImportBridgeQuantitiesItem', data);
  },
  // 删除单位工程量明细
  DelBridgeQuantities(data) {
    return postRequest(baseUrl + 'DelBridgeQuantities', data);
  }
};
