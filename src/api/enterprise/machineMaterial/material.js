/*
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-04 17:04:17
 */
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 材料管理
export default {
  // 查询材料(树形结构)
  queryMaterialTree(data) {
    return postRequest(baseUrl + "QueryMaterialTree", data);
  },
  // 查询材料(列表+分页)
  queryMaterial(data) {
    return postRequest(baseUrl + "QueryMaterial", data);
  },
  // 修改材料
  updateMaterial(data) {
    return postRequest(baseUrl + "UpdateMaterial", data);
  },
  // 删除材料
  delMaterial(data) {
    return postRequest(baseUrl + "DelMaterial", data);
  },
  // 上传材料
  uploadMaterial(data) {
    return postRequest(baseUrl + "UploadMaterial", data);
  },
  // 查询合同预警
  QueryPurchaseContractPaymentWarning(data) {
    return postRequest(baseUrl + "QueryPurchaseContractPaymentWarning", data);
  },
  // 批量上传送货单材料
  BulkUploadPurchaseDeliveryMaterial(data) {
    return postRequest(baseUrl + "BulkUploadPurchaseDeliveryMaterial", data);
  },
  // 送货单材料供应商
  QueryPurchaseDeliveryMaterialSupplier(data) {
    return postRequest(baseUrl + "QueryPurchaseDeliveryMaterialSupplier", data);
  },
  // 查询仓库
  QueryWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "QueryWarehouseManageStoreroom", data);
  },
  // 上传仓库
  UploadWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "UploadWarehouseManageStoreroom", data);
  },
  // 修改仓库
  UpdateWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "UpdateWarehouseManageStoreroom", data);
  },
  // 启用停止仓库
  StartWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "StartWarehouseManageStoreroom", data);
  },
  // 删除仓库
  DelWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "DelWarehouseManageStoreroom", data);
  },
  // 查询领用单位
  QueryInfoMaintainUseUnit(data) {
    return postRequest(baseUrl + "QueryInfoMaintainUseUnit", data);
  },
  // 修改领用单位
  UpdateInfoMaintainUseUnit(data) {
    return postRequest(baseUrl + "UpdateInfoMaintainUseUnit", data);
  },
  // 删除领用单位
  DelInfoMaintainUseUnit(data) {
    return postRequest(baseUrl + "DelInfoMaintainUseUnit", data);
  },
  // 上传领用单位
  UploadInfoMaintainUseUnit(data) {
    return postRequest(baseUrl + "UploadInfoMaintainUseUnit", data);
  },
  // 查询库存
  QueryWarehouseStockList(data) {
    return postRequest(baseUrl + "QueryWarehouseStockList", data);
  },
  // 查询库存详情
  QueryWarehouseStock(data) {
    return postRequest(baseUrl + "QueryWarehouseStock", data);
  },
  // 修改库存
  UpdateWarehouseStock(data) {
    return postRequest(baseUrl + "UpdateWarehouseStock", data);
  },
  // 删除库存
  DelWarehouseStock(data) {
    return postRequest(baseUrl + "DelWarehouseStock", data);
  },
  // 上传库存
  UploadWarehouseStock(data) {
    return postRequest(baseUrl + "UploadWarehouseStock", data);
  },
  // 查询出库单
  QueryOutBoundList(data) {
    return postRequest(baseUrl + "QueryOutBoundList", data);
  },
  // 查询出库单详情
  QueryOutBoundDesc(data) {
    return postRequest(baseUrl + "QueryOutBoundDesc", data);
  },
  // 修改出库单
  UpdateOutBound(data) {
    return postRequest(baseUrl + "UpdateOutBound", data);
  },
  // 删除出库单
  DelOutBound(data) {
    return postRequest(baseUrl + "DelOutBound", data);
  },
  // 上传出库单
  UploadOutBound(data) {
    return postRequest(baseUrl + "UploadOutBound", data);
  },
  // 查询入库单
  QueryWarehouseStorageList(data) {
    return postRequest(baseUrl + "QueryWarehouseStorageList", data);
  },
  // 查询入库单详情
  QueryWarehouseStorage(data) {
    return postRequest(baseUrl + "QueryWarehouseStorage", data);
  },
  // 删除入库单
  DelWarehouseStorage(data) {
    return postRequest(baseUrl + "DelWarehouseStorage", data);
  },
  // 导出入库单
  ExportWarehouseStorage(data) {
    return postRequest(baseUrl + "ExportWarehouseStorage", data);
  },

  // 上传对账单
  UploadPurchaseStatement(data) {
    return postRequest(baseUrl + "UploadPurchaseStatement", data);
  },
  // 修改对账单
  UpdatePurchaseStatement(data) {
    return postRequest(baseUrl + "UpdatePurchaseStatement", data);
  },
  // 查询对账单
  QueryPurchaseStatementList(data) {
    return postRequest(baseUrl + "QueryPurchaseStatementList", data);
  },
  // 查询对账单详情
  QueryPurchaseStatement(data) {
    return postRequest(baseUrl + "QueryPurchaseStatement", data);
  },
  // 删除对账单
  DelPurchaseStatement(data) {
    return postRequest(baseUrl + "DelPurchaseStatement", data);
  },
  // 导出对账单
  ExportPurchaseStatement(data) {
    return postRequest(baseUrl + "ExportPurchaseStatement", data);
  },
  // 查询交易明细
  QueryPurchaseDeliveryMaterialStatement(data) {
    return postRequest(baseUrl + "QueryPurchaseDeliveryMaterialStatement", data);
  },
  // 导出交易明细
  ExportPurchaseDeliveryMaterialStatement(data) {
    return postRequest(baseUrl + "ExportPurchaseDeliveryMaterialStatement", data);
  },

  // 上传拌合站出库价格
  UploadHalfMixStation(data) {
    return postRequest(baseUrl + "UploadHalfMixStation", data);
  },
  // 查询拌合站出库价格
  QueryHalfMixStation(data) {
    return postRequest(baseUrl + "QueryHalfMixStation", data);
  },
  // 删除拌合站出库价格
  DelHalfMixStation(data) {
    return postRequest(baseUrl + "DelHalfMixStation", data);
  },
  // 修改拌合站数据采集
  UploadMixingStationProduce(data) {
    return postRequest(baseUrl + "UploadMixingStationProduce", data);
  },
  // 查询拌合站数据采集
  QueryMixingStationProduce(data) {
    return postRequest(baseUrl + "QueryMixingStationProduce", data);
  },
  // 删除拌合站数据采集
  DelMixingStationProduce(data) {
    return postRequest(baseUrl + "DelMixingStationProduce", data);
  },
  // 关联出库单列表查询
  QueryOutBoundRelationStorageList(data) {
    return postRequest(baseUrl + "QueryOutBoundRelationStorageList", data);
  },
  // 关联入库单列表查询
  WarehouseStorageRelationOutBound(data) {
    return postRequest(baseUrl + "WarehouseStorageRelationOutBound", data);
  },
  // 查询项目工程材料使用量
  QueryMaterialStatisticsOrganList(data) {
    return postRequest(baseUrl + "QueryMaterialStatisticsOrganList", data);
  },
  // 查询盘点期数
  QueryInventoryNo(data) {
    return postRequest(baseUrl + "QueryInventoryNo", data);
  },

  // 查询炸材领用列表
  QueryMaterialUse(data) {
    return postRequest(baseUrl + "QueryMaterialUse", data);
  },
  // 删除炸材领用
  DelMaterialUse(data) {
    return postRequest(baseUrl + "DelMaterialUse", data);
  },
  // 修改炸材领用
  ReturnMaterialUse(data) {
    return postRequest(baseUrl + "ReturnMaterialUse", data);
  },
  // 上传炸材领用
  UploadMaterialUse(data) {
    return postRequest(baseUrl + "UploadMaterialUse", data);
  },

  // 删除炸材库存
  DelMaterialStock(data) {
    return postRequest(baseUrl + "DelMaterialStock", data);
  },
  // 修改炸材库存
  UpdateMaterialStock(data) {
    return postRequest(baseUrl + "UpdateMaterialStock", data);
  },
  //上传炸材库存
  UploadMaterialStock(data) {
    return postRequest(baseUrl + "UploadMaterialStock", data);
  },
  // 查询炸材库存列表
  QueryMaterialStock(data) {
    return postRequest(baseUrl + "QueryMaterialStock", data);
  },
  //查询材料名称，型号，单位
  QueryMaterialStockName(data) {
    return postRequest(baseUrl + "QueryMaterialStockName", data);
  },

  // 上传炸材入库
  UploadMaterialStorage(data) {
    return postRequest(baseUrl + "UploadMaterialStorage", data);
  },
  // 修改炸材入库
  UpdateMaterialStorage(data) {
    return postRequest(baseUrl + "UpdateMaterialStorage", data);
  },
  // 删除炸材入库
  DelMaterialStorage(data) {
    return postRequest(baseUrl + "DelMaterialStorage", data);
  },
  // 查询炸材入库列表
  QueryMaterialStorage(data) {
    return postRequest(baseUrl + "QueryMaterialStorage", data);
  },

  // 上传盘点单
  UploadInventory(data) {
    return postRequest(baseUrl + "UploadInventory", data);
  },
  // 修改盘点单
  UpdateInventory(data) {
    return postRequest(baseUrl + "UpdateInventory", data);
  },
  // 删除盘点单
  DelInventory(data) {
    return postRequest(baseUrl + "DelInventory", data);
  },
  // 查询盘点单
  QueryInventory(data) {
    return postRequest(baseUrl + "QueryInventory", data);
  },
  // 查询盘点单详情
  QueryInventoryDesc(data) {
    return postRequest(baseUrl + "QueryInventoryDesc", data);
  },
  // 查询盘点单期数
  QueryInventoryNo(data) {
    return postRequest(baseUrl + "QueryInventoryNo", data);
  },
  // 查询出库单历史使用部位
  QueryOutBoundUseMachine(data) {
    return postRequest(baseUrl + "QueryOutBoundUseMachine", data);
  },
  // 查询供应商历史评价
  QueryMaterialManagementSupplyUnitAssessList(data) {
    return postRequest(baseUrl + "QueryMaterialManagementSupplyUnitAssessList", data);
  },
  // 上传供应商历史评价
  UploadMaterialManagementSupplyUnitAssess(data) {
    return postRequest(baseUrl + "UploadMaterialManagementSupplyUnitAssess", data);
  },
  // 新增或查询供应商(申购单使用)
  UploadOrUpdateSupplyUnit(data) {
    return postRequest(baseUrl + "UploadOrUpdateSupplyUnit", data);
  },
  // 查询供应商参与项目
  QueryMaterialManagementSupplyUnitJoinProject(data) {
    return postRequest(baseUrl + "QueryMaterialManagementSupplyUnitJoinProject", data);
  },

  // 上传报损单
  UploadLoss(data) {
    return postRequest(baseUrl + "UploadLoss", data);
  },
  // 修改报损单
  UpdateLoss(data) {
    return postRequest(baseUrl + "UpdateLoss", data);
  },
  // 删除报损单
  DelLoss(data) {
    return postRequest(baseUrl + "DelLoss", data);
  },
  // 查询报损单
  QueryLoss(data) {
    return postRequest(baseUrl + "QueryLoss", data);
  },
  // 查询报损单详情
  QueryLossDesc(data) {
    return postRequest(baseUrl + "QueryLossDesc", data);
  },
  // 查询送货单签名
  QueryPurchaseDeliveryProcess(data) {
    return postRequest(baseUrl + "QueryPurchaseDeliveryProcess", data);
  },
  // 查询库存材料
  QueryWarehouseMaterial(data) {
    return postRequest(baseUrl + "QueryWarehouseMaterial", data);
  },

  // 盘亏盘盈总金额汇总
  InventoryStatisticsTotal(data) {
    return postRequest(baseUrl + "InventoryStatisticsTotal", data);
  },
  // 查询盘亏金额季度统计
  InventoryStatisticsQuarter(data) {
    return postRequest(baseUrl + "InventoryStatisticsQuarter", data);
  },
  // 查询盘亏原因统计
  InventoryStatisticsDeficits(data) {
    return postRequest(baseUrl + "InventoryStatisticsDeficits", data);
  },
  // 查询盘亏盘盈 项目（工区）统计
  InventoryStatistics(data) {
    return postRequest(baseUrl + "InventoryStatistics", data);
  },

  // 上传送货单
  UploadPurchaseDeliveryDesc(data) {
    return postRequest(baseUrl + "UploadPurchaseDeliveryDesc", data);
  },
  // 修改送货单
  UpdatePurchaseDeliveryDesc(data) {
    return postRequest(baseUrl + "UpdatePurchaseDeliveryDesc", data);
  },
  // 删除入库单单条材料
  DelWarehouseStorageMaterial(data) {
    return postRequest(baseUrl + "DelWarehouseStorageMaterial", data);
  },
  //
  // 查询出库单列表拌合站半成品/成品）
  QueryOutBoundMixList(data) {
    return postRequest(baseUrl + "QueryOutBoundMixList", data);
  },
  // 查询生产记录详情
  QueryMixingStationProduceDesc(data) {
    return postRequest(baseUrl + "QueryMixingStationProduceDesc", data);
  },
  // 查询各等级混凝土的生产方量
  QueryMixingStationTotalProduce(data) {
    return postRequest(baseUrl + "QueryMixingStationTotalProduce", data);
  },
  // 统计各等级混凝土超标情况
  QueryMixingStationTotalRateProduce(data) {
    return postRequest(baseUrl + "QueryMixingStationTotalRateProduce", data);
  },
  // 拌合站生产方量统计
  QueryMixingProduceStationTotal(data) {
    return postRequest(baseUrl + "QueryMixingProduceStationTotal", data);
  },
  // 查询盘次详情（列表)
  QueryMixingStationPiece(data) {
    return postRequest(baseUrl + "QueryMixingStationPiece", data);
  },
  // 查询生产记录强度等级
  QueryMixingStationProduceBetLev(data) {
    return postRequest(baseUrl + "QueryMixingStationProduceBetLev", data);
  },
  // 查询所有子单元工程及施工部位
  QuerySubUnitUnionAndPart(data) {
    return postRequest(baseUrl + "QuerySubUnitUnionAndPart", data);
  },
  // 修改生产记录
  UpdateMixingStationProduce(data) {
    return postRequest(baseUrl + "UpdateMixingStationProduce", data);
  },
  // 混凝土盘次按预警等级统计超标率
  QueryMixingStationPieceRate(data) {
    return postRequest(baseUrl + "QueryMixingStationPieceRate", data);
  },
  // 确认发料单
  UpdateStoreIssueConfirm(data) {
    return postRequest(baseUrl + "UpdateStoreIssueConfirm", data);
  },
  // 查询发料单
  QueryStoreIssue(data) {
    return postRequest(baseUrl + "QueryStoreIssue", data);
  },
  // 查询项目工区客户列表
  QueryMixingStationProduceCustomer(data) {
    return postRequest(baseUrl + "QueryMixingStationProduceCustomer", data);
  },
  // 查询材料是否使用中
  QueryMaterialTreeMaterialIsUsed(data) {
    return postRequest(baseUrl + "QueryMaterialTreeMaterialIsUsed", data);
  },
  // 混凝土盘次预警控制
  QueryMixingStationPieceContro(data) {
    return postRequest(baseUrl + "QueryMixingStationPieceContro", data);
  },
  // 混凝土原材料超标统计
  QueryMixingStationPieceDosage(data) {
    return postRequest(baseUrl + "QueryMixingStationPieceDosage", data);
  },
  // 查询混凝土原材料预警控制
  QueryMixingStationPieceDosageContro(data) {
    return postRequest(baseUrl + "QueryMixingStationPieceDosageContro", data);
  },
  // 地磅关联送货单，查询未关联地磅单号
  QueryLoadometerWeightNoInfo(data) {
    return postRequest(baseUrl + "QueryLoadometerWeightNoInfo", data);
  },
  // 查询材料出入库总量统计
  QueryMaterialStatisticsList(data) {
    return postRequest(baseUrl + "QueryMaterialStatisticsList", data);
  },
  // 查询材料出入库金额统计
  QueryMaterialStatisticsMoneyList(data) {
    return postRequest(baseUrl + "QueryMaterialStatisticsMoneyList", data);
  },
  // 材料价格分析
  QueryMaterialStatisticsUseUnitMoneyList(data) {
    return postRequest(baseUrl + "QueryMaterialStatisticsUseUnitMoneyList", data);
  },
  // 地磅关联送货单，查询未关联地磅单号
  QueryMaterialStatisticsSupplyPriceList(data) {
    return postRequest(baseUrl + "QueryMaterialStatisticsSupplyPriceList", data);
  },
  // 地磅关联送货单，查询未关联地磅单号
  QueryMaterialStatisticsPriceList(data) {
    return postRequest(baseUrl + "QueryMaterialStatisticsPriceList", data);
  },
  // 查询材料节超统计汇总
  QueryMaterialExcessList(data) {
    return postRequest(baseUrl + "QueryMaterialExcessList", data);
  },
  // 查询材料节超详情
  QueryMaterialExcessDetail(data) {
    return postRequest(baseUrl + "QueryMaterialExcessDetail", data);
  },

  // 导入衬砌材料
  ImportMaterialExcessLining(data) {
    return postRequest(baseUrl + "ImportMaterialExcessLining", data);
  },
  // 查询衬砌材料(合并数据)
  QueryMaterialExcessLining(data) {
    return postRequest(baseUrl + "QueryMaterialExcessLining", data);
  },
  // 导出衬砌材料
  QueryMaterialExcessLiningExcel(data) {
    return postRequest(baseUrl + "QueryMaterialExcessLiningExcel", data);
  },

  // 导出混凝土盘次预警控制
  ExportMixingStationPieceContro(data) {
    return postRequest(baseUrl + "ExportMixingStationPieceContro", data);
  },
  // 导出出库单(列表
  ExportOutBoundList(data) {
    return postRequest(baseUrl + "ExportOutBoundList", data);
  },
  // 导出出库单(列表拌合站半成品/成品
  ExportOutBoundMixList(data) {
    return postRequest(baseUrl + "ExportOutBoundMixList", data);
  },
  // 导出库存查询列表
  ExportWarehouseStock(data) {
    return postRequest(baseUrl + "ExportWarehouseStock", data);
  },
  // 导出材料
  ImportMaterial(data) {
    return postRequest(baseUrl + "ImportMaterial", data);
  },
  // 导出入库单
  ExportWarehouseStorage(data) {
    return postRequest(baseUrl + "ExportWarehouseStorage", data);
  },
  // 导出交易明细
  ExportPurchaseStatement(data) {
    return postRequest(baseUrl + "ExportPurchaseStatement", data);
  },
  // 导出地磅
  ExportLoadometerWeight(data) {
    return postRequest(baseUrl + "ExportLoadometerWeight", data);
  },
  // 导出生产记录
  ExportMixingStationProduce(data) {
    return postRequest(baseUrl + "ExportMixingStationProduce", data);
  },
  // 导出入库单
  ExportWarehouseStorage(data) {
    return postRequest(baseUrl + "ExportWarehouseStorage", data);
  },
  // 导出单元材料数据(地磅数据汇总)
  ExportLoadometerWeightMaterial(data) {
    return postRequest(baseUrl + "ExportLoadometerWeightMaterial", data);
  },
  // 导出盘列表
  ExportMixingStationPiece(data) {
    return postRequest(baseUrl + "ExportMixingStationPiece", data);
  },
  // 导出生产记录
  ExportMixingStationProduce(data) {
    return postRequest(baseUrl + "ExportMixingStationProduce", data);
  },
  // 导出各等级混凝土的生产方量信息
  ExportMixingStationTotalProduce(data) {
    return postRequest(baseUrl + "ExportMixingStationTotalProduce", data);
  },
  // 导出混凝土盘次按预警等级统计超标率
  ExportMixingStationPieceRate(data) {
    return postRequest(baseUrl + "ExportMixingStationPieceRate", data);
  },
  // 导出发料单
  ExportStoreIssue(data) {
    return postRequest(baseUrl + "ExportStoreIssue", data);
  },
  // 导出混凝土原材料超标
  ExportMixingStationPieceDosage(data) {
    return postRequest(baseUrl + "ExportMixingStationPieceDosage", data);
  },
  // 导出混凝土原材料预警控制
  ExportMixingStationPieceDosageContro(data) {
    return postRequest(baseUrl + "ExportMixingStationPieceDosageContro", data);
  },
  // 导出申购单(列表
  ExportPurchaseApplymentList(data) {
    return postRequest(baseUrl + "ExportPurchaseApplymentList", data);
  },
  // 导出采购合同
  ExportPurchaseContract(data) {
    return postRequest(baseUrl + "ExportPurchaseContract", data);
  },
  // 导出送货单(列表)
  ExportPurchaseDeliveryList(data) {
    return postRequest(baseUrl + "ExportPurchaseDeliveryList", data);
  },
  // 导出采购合同付款预警
  ExportPurchaseContractPaymentWarning(data) {
    return postRequest(baseUrl + "ExportPurchaseContractPaymentWarning", data);
  },
  // 导出)库存材料详情列表
  ExportWarehouseStockDesc(data) {
    return postRequest(baseUrl + "ExportWarehouseStockDesc", data);
  },
  // 导出报损
  ExportLoss(data) {
    return postRequest(baseUrl + "ExportLoss", data);
  },
  // 导出供应商参与项目
  ExportMaterialManagementSupplyUnitJoinProject(data) {
    return postRequest(baseUrl + "ExportMaterialManagementSupplyUnitJoinProject", data);
  },
  // 导出炸材库存
  ExportMaterialStock(data) {
    return postRequest(baseUrl + "ExportMaterialStock", data);
  },
  // 导出炸材入库
  ExportMaterialStorage(data) {
    return postRequest(baseUrl + "ExportMaterialStorage", data);
  },
  // 导出领用汇总
  ExportMaterialUse(data) {
    return postRequest(baseUrl + "ExportMaterialUse", data);
  },
  // 导出报损单详情
  ExportLossDetail(data) {
    return postRequest(baseUrl + "ExportLossDetail", data);
  },
};
