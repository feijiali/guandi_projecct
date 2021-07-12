import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    //***************************变更台账***********************/
    //***************************台账申请***********************/

    // 导出台账申请
    ExportChangeParameterParameter(data) {
        return postRequest(baseUrl + "ExportChangeParameterParameter", data);
    },
    // 上传台账申请
    UploadChangeParameterParameter(data) {
        return postRequest(baseUrl + "UploadChangeParameterParameter", data);
    },
    // 修改台账申请
    UpdateChangeParameterParameter(data) {
        return postRequest(baseUrl + "UpdateChangeParameterParameter", data);
    },
    // 删除台账申请
    DelChangeParameterParameter(data) {
        return postRequest(baseUrl + "DelChangeParameterParameter", data);
    },
    // 查询台账申请-列表
    QueryChangeParameterParameterList(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterList", data);
    },
    // 查询台账申请
    QueryChangeParameterParameter(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameter", data);
    },
    // 查询台账金额统计
    QueryChangeParameterParameterMoney(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterMoney", data);
    },
    // 导入台账申请
    ImportChangeParameterParameter(data) {
        return postRequest(baseUrl + "ImportChangeParameterParameter", data);
    },
    // 查询历史变更详情列表
    QueryChangeParameterParameterHistoryList(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterHistoryList", data);
    },
    //***************************台账更新***********************/

    // 导出台账更新
    ExportChangeParameterParameterInfo(data) {
        return postRequest(baseUrl + "ExportChangeParameterParameterInfo", data);
    },
    // 上传台账更新
    UploadChangeParameterParameterInfo(data) {
        return postRequest(baseUrl + "UploadChangeParameterParameterInfo", data);
    },
    // 修改台账更新
    UpdateChangeParameterParameterInfo(data) {
        return postRequest(baseUrl + "UpdateChangeParameterParameterInfo", data);
    },
    // 删除台账更新
    DelChangeParameterParameterInfo(data) {
        return postRequest(baseUrl + "DelChangeParameterParameterInfo", data);
    },
    // 查询台账更新-列表
    QueryChangeParameterParameterInfoList(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterInfoList", data);
    },
    // 查询台账更新
    QueryChangeParameterParameterInfo(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterInfo", data);
    },
    // 导入台账更新
    ImportChangeParameterParameterInfo(data) {
        return postRequest(baseUrl + "ImportChangeParameterParameterInfo", data);
    },
    ExportChangeParameterParameterInfoDetail(data) {
        return postRequest(baseUrl + "ExportChangeParameterParameterInfoDetail", data);
    },
    //***************************变更台账总览***********************/
    // 查询变更批复率
    QueryChangeParameterParameterSummary(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterSummary", data);
    },
    // 查询变更数
    QueryChangeParameterParameterSummaryNum(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterSummaryNum", data);
    },
    // 查询变更金额
    QueryChangeParameterParameterSummaryMoney(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterSummaryMoney", data);
    },
    // 变更情况统计
    QueryChangeParameterParameterSummaryTotal(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterSummaryTotal", data);
    },
    // 导出变更情况统计
    ExportChangeParameterParameterSummaryTotal(data) {
        return postRequest(baseUrl + "ExportChangeParameterParameterSummaryTotal", data);
    },
    // 变更情况统计小计
    QueryChangeParameterParameterSummaryTotalSum(data) {
        return postRequest(baseUrl + "QueryChangeParameterParameterSummaryTotalSum", data);
    },
};
