import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 考项目
export default {
    //***************************成本分析表***********************/
    // 导出成本分析表
    ExportAssessmentCostAnalysis(data) {
        return postRequest(baseUrl + "ExportAssessmentCostAnalysis", data);
    },
    // 上传成本分析表
    UploadAssessmentCostAnalysis(data) {
        return postRequest(baseUrl + "UploadAssessmentCostAnalysis", data);
    },
    // 调差成本分析表
    UpdateAssessmentCostAnalysis(data) {
        return postRequest(baseUrl + "UpdateAssessmentCostAnalysis", data);
    },
    // 修改成本分析表
    UpdateAssessmentCostAnalysis(data) {
        return postRequest(baseUrl + "UpdateAssessmentCostAnalysis", data);
    },
    // 删除成本分析表
    DelAssessmentCostAnalysis(data) {
        return postRequest(baseUrl + "DelAssessmentCostAnalysis", data);
    },
    // 批量修改周金额
    UpdateAssessmentCostAnalysisWeek(data) {
        return postRequest(baseUrl + "UpdateAssessmentCostAnalysisWeek", data);
    },
    // 查询本月未调差金额
    QueryAssessmentCostAnalysisMonth(data) {
        return postRequest(baseUrl + "QueryAssessmentCostAnalysisMonth", data);
    },
    // 导查询成本分析表-列表
    QueryAssessmentCostAnalysisList(data) {
        return postRequest(baseUrl + "QueryAssessmentCostAnalysisList", data);
    },
    // 查询成本分析表
    QueryAssessmentCostAnalysis(data) {
        return postRequest(baseUrl + "QueryAssessmentCostAnalysis", data);
    },
    // 查询成本分析修改纪录表-列表
    QueryAssessmentCostAnalysisHistoryList(data) {
        return postRequest(baseUrl + "QueryAssessmentCostAnalysisHistoryList", data);
    },
    // 查询成本分析修改纪录表
    QueryAssessmentCostAnalysisHistory(data) {
        return postRequest(baseUrl + "QueryAssessmentCostAnalysisHistory", data);
    },
    // 同步时间所属周成本分析周金额
    StatisticsCostAnalysis(data) {
        return postRequest(baseUrl + "StatisticsCostAnalysis", data);
    },
    // 导入成本分析表
    ImportAssessmentCostAnalysis(data) {
        return postRequest(baseUrl + "ImportAssessmentCostAnalysis", data);
    },
    // 查询项目考核
    QueryProjectAssessment(data) {
        return postRequest(baseUrl + "QueryProjectAssessment", data);
    },
    // 查询项目考核年统计
    QueryProjectAssessmentYear(data) {
        return postRequest(baseUrl + "QueryProjectAssessmentYear", data);
    },
    //***************************资产负债表***********************/
    // 导出项目考核表
    ExportProjectAssessmentAnalysis(data) {
        return postRequest(baseUrl + "ExportProjectAssessmentAnalysis", data);
    },
    // 导出资产负债表
    ExportAssessmentBalanceSheet(data) {
        return postRequest(baseUrl + "ExportAssessmentBalanceSheet", data);
    },
    // 上传资产负债表
    UploadAssessmentBalanceSheet(data) {
        return postRequest(baseUrl + "UploadAssessmentBalanceSheet", data);
    },
    // 修改资产负债表
    UpdateAssessmentBalanceSheet(data) {
        return postRequest(baseUrl + "UpdateAssessmentBalanceSheet", data);
    },
    // 删除资产负债表
    DelAssessmentBalanceSheet(data) {
        return postRequest(baseUrl + "DelAssessmentBalanceSheet", data);
    },
    // 查询资产负债表-列表
    QueryAssessmentBalanceSheetList(data) {
        return postRequest(baseUrl + "QueryAssessmentBalanceSheetList", data);
    },
    // 导入资产负债表
    ImportAssessmentBalanceSheet(data) {
        return postRequest(baseUrl + "ImportAssessmentBalanceSheet", data);
    },


    //***************************现金流量表***********************/
    // 导出现金流量表
    ExportAssessmentCashFlow(data) {
        return postRequest(baseUrl + "ExportAssessmentCashFlow", data);
    },
    // 上传现金流量表
    UploadAssessmentCashFlow(data) {
        return postRequest(baseUrl + "UploadAssessmentCashFlow", data);
    }, 
    // 修改现金流量表
    UpdateAssessmentCashFlow(data) {
        return postRequest(baseUrl + "UpdateAssessmentCashFlow", data);
    },
    // 删除现金流量表
    DelAssessmentCashFlow(data) {
        return postRequest(baseUrl + "DelAssessmentCashFlow", data);
    },
    // 查询现金流量表-列表
    QueryAssessmentCashFlowList(data) {
        return postRequest(baseUrl + "QueryAssessmentCashFlowList", data);
    },
    // 导入现金流量表
    ImportAssessmentCashFlow(data) {
        return postRequest(baseUrl + "ImportAssessmentCashFlow", data);
    },


    //***************************项目现金流量表***********************/
    // 导出项目现金流量表
    ExportAssessmentProCashFlow(data) {
        return postRequest(baseUrl + "ExportAssessmentProCashFlow", data);
    },
    // 上传项目现金流量表
    UploadAssessmentProCashFlow(data) {
        return postRequest(baseUrl + "UploadAssessmentProCashFlow", data);
    },
    // 修改项目现金流量表
    UpdateAssessmentProCashFlow(data) {
        return postRequest(baseUrl + "UpdateAssessmentProCashFlow", data);
    },
    //删除项目现金流量表
    DelAssessmentProCashFlow(data) {
        return postRequest(baseUrl + "DelAssessmentProCashFlow", data);
    },
    //删除项目现金流量表
    DelAssessmentProCashFlow(data) {
        return postRequest(baseUrl + "DelAssessmentProCashFlow", data);
    },
    //查询项目现金流量表-列表
    QueryAssessmentProCashFlowList(data) {
        return postRequest(baseUrl + "QueryAssessmentProCashFlowList", data);
    },
    //导入项目现金流量表
    ImportAssessmentProCashFlow(data) {
        return postRequest(baseUrl + "ImportAssessmentProCashFlow", data);
    },

    //***************************利润表***********************/
    // 导出利润表
    ExportAssessmentProfit(data) {
        return postRequest(baseUrl + "ExportAssessmentProfit", data);
    },
    // 上传利润表
    UploadAssessmentProfit(data) {
        return postRequest(baseUrl + "UploadAssessmentProfit", data);
    },
    // 修改利润表
    UpdateAssessmentProfit(data) {
        return postRequest(baseUrl + "UpdateAssessmentProfit", data);
    },
    // 删除利润表
    DelAssessmentProfit(data) {
        return postRequest(baseUrl + "DelAssessmentProfit", data);
    },
    // 查询利润表-列表
    QueryAssessmentProfitList(data) {
        return postRequest(baseUrl + "QueryAssessmentProfitList", data);
    },
    // 导入利润表()
    ImportAssessmentProfit(data) {
        return postRequest(baseUrl + "ImportAssessmentProfit", data);
    },
};
