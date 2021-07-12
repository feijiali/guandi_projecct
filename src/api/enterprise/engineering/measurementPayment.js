/*
 * @Autor: 邓易
 * @Date: 2021-01-08 09:08:38
 * @LastEditors: 邓易
 * @LastEditTime: 2021-01-08 09:12:13
 */
import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

export default {
  // 上传计量对下临建
  uploadCalculateDownCalculateDownTemp(data) {
    return postRequest(baseUrl + 'UploadCalculateDownCalculateDownTemp', data);
  },
  // 修改计量对下临
  updateCalculateDownCalculateDownTemp(data) {
    return postRequest(baseUrl + 'UpdateCalculateDownCalculateDownTemp', data);
  },
  // 查询计量对下临建-列表
  queryCalculateDownCalculateDownTempList(data) {
    return postRequest(baseUrl + 'QueryCalculateDownCalculateDownTempList', data);
  },
  // 查询章节-统计
  queryQuantitiesChapterValueSummary(data) {
    return postRequest(baseUrl + 'QueryQuantitiesChapterValueSummary', data);
  },
  // 传章节产值
  uploadQuantitiesChapterValueChange(data) {
    return postRequest(baseUrl + 'UploadQuantitiesChapterValueChange', data);
  },
  // 查询细目产值-列表
  queryQuantitiesItemValueList(data) {
    return postRequest(baseUrl + 'QueryQuantitiesItemValueList', data);
  },
  // 导出细目产值
  exportQuantitiesItemValueSummary(data) {
    return postRequest(baseUrl + 'ExportQuantitiesItemValueSummary', data);
  },
  // 上传细目产值-修改
  uploadQuantitiesItemValueChange(data) {
    return postRequest(baseUrl + 'UploadQuantitiesItemValueChange', data);
  },
  // 导出详情细目
  exportQuantitiesItem(data) {
    return postRequest(baseUrl + 'ExportQuantitiesItem', data);
  },
  // 上传详情细目
  uploadQuantitiesItem(data) {
    return postRequest(baseUrl + 'UploadQuantitiesItem', data);
  },
  // 修改详情细目
  updateQuantitiesItem(data) {
    return postRequest(baseUrl + 'UpdateQuantitiesItem', data);
  },
  // 删除详情细目
  delQuantitiesItem(data) {
    return postRequest(baseUrl + 'DelQuantitiesItem', data);
  },
  // 查询详情细目
  queryQuantitiesItem(data) {
    return postRequest(baseUrl + 'QueryQuantitiesItem', data);
  },
  // 导入详情细目
  importQuantitiesItem(data) {
    return postRequest(baseUrl + 'ImportQuantitiesItem', data);
  },
  // 查询计量期数-列表
  queryCalculateUpIssueList(data) {
    return postRequest(baseUrl + 'QueryCalculateUpIssueList', data);
  },
  // 查询计量明细-列表
  queryCalculateUpIssueDetailList(data) {
    return postRequest(baseUrl + 'QueryCalculateUpIssueDetailList', data);
  },
  // 上传计量期数
  uploadCalculateUpIssue(data) {
    return postRequest(baseUrl + 'UploadCalculateUpIssue', data);
  },
  // 修改计量期数
  updateCalculateUpIssue(data) {
    return postRequest(baseUrl + 'UpdateCalculateUpIssue', data);
  },
  // 删除计量期数
  delCalculateUpIssue(data) {
    return postRequest(baseUrl + 'DelCalculateUpIssue', data);
  },
  // 导入计量期数
  importCalculateUpIssue(data) {
    return postRequest(baseUrl + 'ImportCalculateUpIssue', data);
  },
  // 查询子单位工程班组
  queryStaffTeamByProject(data) {
    return postRequest(baseUrl + 'QueryStaffTeamByProject', data);
  },
  // 查询计量对下隧道-列表
  queryCalculateDownCalculateDownTunnelList(data) {
    return postRequest(baseUrl + 'QueryCalculateDownCalculateDownTunnelList', data);
  },
  // 批量-修改计量对下隧道
  uploadCalculateDownCalculateDownTunnel(data) {
    return postRequest(baseUrl + 'UploadCalculateDownCalculateDownTunnel', data);
  },
  delCalculateDownCalculateDownTunnel(data) {
    return postRequest(baseUrl + 'DelCalculateDownCalculateDownTunnel', data);
  },
  // 批量-修改计量对下隧道
  updateCalculateDownCalculateDownTunnel(data) {
    return postRequest(baseUrl + 'UpdateCalculateDownCalculateDownTunnel', data);
  },
  // 添加/删除附件
  urCalculateDownCalculateDownTunnelFile(data) {
    return postRequest(baseUrl + 'UrCalculateDownCalculateDownTunnelFile', data);
  },
  // 导出计量对下隧道
  exportCalculateDownCalculateDownTunnel(data) {
    return postRequest(baseUrl + 'ExportCalculateDownCalculateDownTunnel', data);
  },
  // 上传计量对下桥梁
  uploadCalculateDownCalculateDownBridge(data) {
    return postRequest(baseUrl + 'UploadCalculateDownCalculateDownBridge', data);
  },
  // 修改计量对下桥梁
  updateCalculateDownCalculateDownBridge(data) {
    return postRequest(baseUrl + 'UpdateCalculateDownCalculateDownBridge', data);
  },
  // 删除计量对下桥梁
  delCalculateDownCalculateDownBridge(data) {
    return postRequest(baseUrl + 'DelCalculateDownCalculateDownBridge', data);
  },
  // 上传计量对下桥梁
  queryCalculateDownCalculateDownBridgeList(data) {
    return postRequest(baseUrl + 'QueryCalculateDownCalculateDownBridgeList', data);
  },
  // 添加/删除附件
  urCalculateDownCalculateDownBridgeFile(data) {
    return postRequest(baseUrl + 'UrCalculateDownCalculateDownBridgeFile', data);
  },
  // 导出计量对下桥梁
  exportCalculateDownCalculateDownBridge(data) {
    return postRequest(baseUrl + 'ExportCalculateDownCalculateDownBridge', data);
  },
  // 导出计量对下路基
  exportCalculateDownCalculateDownRoad(data) {
    return postRequest(baseUrl + 'ExportCalculateDownCalculateDownRoad', data);
  },
  // 上传计量对下路基
  uploadCalculateDownCalculateDownRoad(data) {
    return postRequest(baseUrl + 'UploadCalculateDownCalculateDownRoad', data);
  },
  // 修改计量对下路基
  updateCalculateDownCalculateDownRoad(data) {
    return postRequest(baseUrl + 'UpdateCalculateDownCalculateDownRoad', data);
  },
  // 删除计量对下路基
  delCalculateDownCalculateDownRoad(data) {
    return postRequest(baseUrl + 'DelCalculateDownCalculateDownRoad', data);
  },
  // 查询计量对下路基-列表
  queryCalculateDownCalculateDownRoadList(data) {
    return postRequest(baseUrl + 'QueryCalculateDownCalculateDownRoadList', data);
  },
  // 计量对下路基-添加/删除附件
  urCalculateDownCalculateDownRoad(data) {
    return postRequest(baseUrl + 'UrCalculateDownCalculateDownRoad', data);
  },
  // 导出计量对下临建
  exportCalculateDownCalculateDownTemp(data) {
    return postRequest(baseUrl + 'UrCalculateDownCalculateDownRoad', data);
  },
  // 上传计量对下临建
  uploadCalculateDownCalculateDownTemp(data) {
    return postRequest(baseUrl + 'UploadCalculateDownCalculateDownTemp', data);
  },
  // 修改计量对下临建
  updateCalculateDownCalculateDownTemp(data) {
    return postRequest(baseUrl + 'UpdateCalculateDownCalculateDownTemp', data);
  },
  // 删除计量对下临建
  delCalculateDownCalculateDownTemp(data) {
    return postRequest(baseUrl + 'DelCalculateDownCalculateDownTemp', data);
  },
  // 查询计量对下临建-列表
  queryCalculateDownCalculateDownTempList(data) {
    return postRequest(baseUrl + 'QueryCalculateDownCalculateDownTempList', data);
  },
  // 添加/删除附件
  urCalculateDownCalculateDownTemp(data) {
    return postRequest(baseUrl + 'UrCalculateDownCalculateDownTemp', data);
  },
  // 查询所有子单位工程
  querySubUnitUnion(data) {
    return postRequest(baseUrl + 'QuerySubUnitUnion', data);
  },
  // 查询动态合同列表
  queryOAContractApprovalDynamic(data) {
    return postRequest(baseUrl + 'QueryOAContractApprovalDynamic', data);
  }
};
