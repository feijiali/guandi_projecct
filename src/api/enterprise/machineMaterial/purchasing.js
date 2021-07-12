import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 材料管理
export default {
  // 查询申购单-列表
  QueryPurchaseApplymentList(data) {
    return postRequest(baseUrl + "QueryPurchaseApplymentList", data);
  },
  // 查询申购单
  QueryPurchaseApplyment(data) {
    return postRequest(baseUrl + "QueryPurchaseApplyment", data);
  },
  // 修改申购单
  UpdatePurchaseApplyment(data) {
    return postRequest(baseUrl + "UpdatePurchaseApplyment", data);
  },
  // 删除申购单
  DelPurchaseApplyment(data) {
    return postRequest(baseUrl + "DelPurchaseApplyment", data);
  },
  // 上传申购单
  UploadPurchaseApplyment(data) {
    return postRequest(baseUrl + "UploadPurchaseApplyment", data);
  },
  // 上传采购材料
  BulkUploadPurchaseContractMaterial(data) {
    return postRequest(baseUrl + "BulkUploadPurchaseContractMaterial", data);
  },
  //查询申购单材料
  QueryPurchaseApplymentDeficiency(data) {
    return postRequest(baseUrl + "QueryPurchaseApplymentDeficiency", data);
  }, // 查询采购合同-列表
  QueryPurchaseContractList(data) {
    return postRequest(baseUrl + "QueryPurchaseContractList", data);
  },
  // 查询采购合同
  QueryPurchasedeliverySupplier(data) {
    return postRequest(baseUrl + "QueryPurchasedeliverySupplier", data);
  },
  // 查询采购合同
  QueryPurchaseContract(data) {
    return postRequest(baseUrl + "QueryPurchaseContract", data);
  },
  // 上传采购合同
  UploadPurchaseContract(data) {
    return postRequest(baseUrl + "UploadPurchaseContractDesc", data);
  },
  // 修改采购合同
  UpdatePurchaseContract(data) {
    return postRequest(baseUrl + "UpdatePurchaseContractDesc", data);
  },
  // 删除采购合同
  DelPurchaseContract(data) {
    return postRequest(baseUrl + "DelPurchaseContract", data);
  },
  // 修改采购合同-调差
  UploadPurchaseContractDiff(data) {
    return postRequest(baseUrl + "UploadPurchaseContractDiff", data);
  },
  // 查询历史我方单位
  QueryPurchaseContractDepart(data) {
    return postRequest(baseUrl + "QueryPurchaseContractDepart", data);
  },
  // 查询供应商
  QueryPurchaseApplymentMaterialSupplier(data) {
    return postRequest(baseUrl + "QueryPurchaseApplymentMaterialSupplier", data);
  },
  // 批量上传合同付款项
  BulkUploadPurchaseContractPaymentPlan(data) {
    return postRequest(baseUrl + "BulkUploadPurchaseContractPaymentPlan", data);
  },
  // 批量上传合同付款明细
  BulkUploadPurchaseContractPayment(data) {
    return postRequest(baseUrl + "BulkUploadPurchaseContractPayment", data);
  },
  // 批量上传合同付款项
  BulkUploadPurchaseContractPaymentPlan(data) {
    return postRequest(baseUrl + "BulkUploadPurchaseContractPaymentPlan", data);
  },
  // 查询合同付款
  QueryPurchaseContractPayment(data) {
    return postRequest(baseUrl + "QueryPurchaseContractPayment", data);
  },

  // 查询送货单-列表
  QueryPurchaseDeliveryList(data) {
    return postRequest(baseUrl + "QueryPurchaseDeliveryList", data);
  },
  // 查询送货单
  QueryPurchaseDelivery(data) {
    return postRequest(baseUrl + "QueryPurchaseDelivery", data);
  },
  // 上传送货单
  UploadPurchaseDelivery(data) {
    return postRequest(baseUrl + "UploadPurchaseDelivery", data);
  },
  // 修改送货单
  UpdatePurchaseDelivery(data) {
    return postRequest(baseUrl + "UpdatePurchaseDelivery", data);
  },
  // 删除送货单
  DelPurchaseDelivery(data) {
    return postRequest(baseUrl + "DelPurchaseDelivery", data);
  },
  // 修改送货单-调差
  UploadPurchaseDeliveryDiff(data) {
    return postRequest(baseUrl + "UploadPurchaseDeliveryDiff", data);
  },
  // 撤销送货单
  CancelPurchaseDelivery(data) {
    return postRequest(baseUrl + "CancelPurchaseDelivery", data);
  },

  // 查询送货单材料
  QueryPurchaseDeliveryApplymentMaterial(data) {
    return postRequest(baseUrl + "QueryPurchaseDeliveryApplymentMaterial", data);
  },
  // 上传送货单材料
  UploadPurchaseDeliveryMaterial(data) {
    return postRequest(baseUrl + "UploadPurchaseDeliveryMaterial", data);
  },
  // 修改送货单材料
  UpdatePurchaseDeliveryMaterial(data) {
    return postRequest(baseUrl + "UpdatePurchaseDeliveryMaterial", data);
  },
  // 删除送货单材料
  DelPurchaseDeliveryMaterial(data) {
    return postRequest(baseUrl + "DelPurchaseDeliveryMaterial", data);
  },

  // 预警总金额
  QueryPurchaseContractPaymentWarningMoney(data) {
    return postRequest(baseUrl + "QueryPurchaseContractPaymentWarningMoney ", data);
  },
  // 合同总金额
  QueryPurchaseContractMoney(data) {
    return postRequest(baseUrl + "QueryPurchaseContractMoney", data);
  },
  // 查询合同提交人申请人
  QueryPurchaseContractSubmitter(data) {
    return postRequest(baseUrl + "QueryPurchaseContractSubmitter", data);
  },
};
