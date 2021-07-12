import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 成本测算
export default {
    // 查询业主扣回-列表
    QueryCostEstimationRebateList(data) {
        return postRequest(baseUrl + "QueryCostEstimationRebateList", data);
    },
    // 导入业主扣回
    ImportCostEstimationRebate(data) {
        return postRequest(baseUrl + "ImportCostEstimationRebate", data);
    },
    // 导出业主扣回
    ExportCostEstimationRebate(data) {
        return postRequest(baseUrl + "ExportCostEstimationRebate", data);
    },
    // 查询管理费用-列表
    QueryCostEstimationManageInfoList(data) {
        return postRequest(baseUrl + "QueryCostEstimationManageInfoList", data);
    },
    // 导入管理费用
    ImportCostEstimationManageInfo(data) {
        return postRequest(baseUrl + "ImportCostEstimationManageInfo", data);
    },
    // 导出管理费用
    ExportCostEstimationManageInfo(data) {
        return postRequest(baseUrl + "ExportCostEstimationManageInfo", data);
    },
    // 查询主体工程-列表
    QueryCostEstimationMainProjectList(data) {
        return postRequest(baseUrl + "QueryCostEstimationMainProjectList", data);
    },
    // 导入主体工程
    ImportCostEstimationMainProject(data) {
        return postRequest(baseUrl + "ImportCostEstimationMainProject", data);
    },
    // 导出主体工程
    ExportCostEstimationMainProject(data) {
        return postRequest(baseUrl + "ExportCostEstimationMainProject", data);
    },
    //查询成本测算-列表
    QueryCostEstimationCostInfoList(data) {
        return postRequest(baseUrl + "QueryCostEstimationCostInfoList", data);
    },
    //导入成本测算
    ImportCostEstimationCostInfo(data) {
        return postRequest(baseUrl + "ImportCostEstimationCostInfo", data);
    },
    //导出成本测算
    ExportCostEstimationCostInfo(data) {
        return postRequest(baseUrl + "ExportCostEstimationCostInfo", data);
    },
    //修改成本测算
    UpdateCostEstimationCostInfo(data) {
        return postRequest(baseUrl + "UpdateCostEstimationCostInfo", data);
    },
    //查询成本测算修改日志-列表
    QueryCostEstimationCostInfoLogList(data) {
        return postRequest(baseUrl + "QueryCostEstimationCostInfoLogList", data);
    },
    //查询项目考核-列表
    QueryCostEstimationProjectAssessmentList(data) {
        return postRequest(baseUrl + "QueryCostEstimationProjectAssessmentList", data);
    },
    //导出项目考核
    ExportCostEstimationProjectAssessment(data) {
        return postRequest(baseUrl + "ExportCostEstimationProjectAssessment", data);
    },
    //导入项目考核
    ImportCostEstimationProjectAssessment(data) {
        return postRequest(baseUrl + "ImportCostEstimationProjectAssessment", data);
    },
};