import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 工程进度计量管理
export default {
    // 上传合同计量
    UploadProjectReportEngineeringMain(data) {
        return postRequest(baseUrl + "UploadProjectReportEngineeringMain", data);
    },
    // 删除计量
    DelProjectReportEngineeringMain(data) {
        return postRequest(baseUrl + "DelProjectReportEngineeringMain", data);
    },
    // 查询计量-列表
    QueryProjectReportEngineeringMainList(data) {
        return postRequest(baseUrl + "QueryProjectReportEngineeringMainList", data);
    },
    // 查询计量详情
    QueryProjectReportEngineeringMain(data) {
        return postRequest(baseUrl + "QueryProjectReportEngineeringMain", data);
    },
    // 导入合同计量
    ImportProjectReportEngineeringMain(data) {
        return postRequest(baseUrl + "ImportProjectReportEngineeringMain", data);
    },
    // 导出计量
    ExportProjectReportEngineeringMain(data) {
        return postRequest(baseUrl + "ExportProjectReportEngineeringMain", data);
    },
    // 查询合同动态管理
    QueryProjectReportInfo(data) {
        return postRequest(baseUrl + "QueryProjectReportInfo", data);
    },
    // 查询合同动态管理分类小计
    QueryProjectReportInfoTotal(data) {
        return postRequest(baseUrl + "QueryProjectReportInfoTotal", data);
    },
    // 导出合同动态管理
    ExportProjectReportInfo(data) {
        return postRequest(baseUrl + "ExportProjectReportInfo", data);
    },
    // 查询历史输入工程项目()
    QueryProjectReportEngineeringMainHistory(data) {
        return postRequest(baseUrl + "QueryProjectReportEngineeringMainHistory", data);
    },
    //   导出计量合同付款()
    ExportProjectReportEngineeringPayInfo(data) {
        return postRequest(baseUrl + "ExportProjectReportEngineeringPayInfo", data);
    },
    //   导出计量合同付款详情()
    ExportProjectReportEngineeringPay(data) {
        return postRequest(baseUrl + "ExportProjectReportEngineeringPay", data);
    },
    //   上传计量合同付款()
    UploadProjectReportEngineeringPay(data) {
        return postRequest(baseUrl + "UploadProjectReportEngineeringPay", data);
    },
    // QueryProjectReportEngineeringMainDuration
    QueryProjectReportEngineeringMainDuration(data) {
        return postRequest(baseUrl + "QueryProjectReportEngineeringMainDuration", data);
    },
    //   修改计量合同付款()
    UpdateProjectReportEngineeringPay(data) {
        return postRequest(baseUrl + "UpdateProjectReportEngineeringPay", data);
    },
    //   删除计量合同付款()
    DelProjectReportEngineeringPay(data) {
        return postRequest(baseUrl + "DelProjectReportEngineeringPay", data);
    },
    // 查询计量合同付款-列表()
    QueryProjectReportEngineeringPayList(data) {
        return postRequest(baseUrl + "QueryProjectReportEngineeringPayList", data);
    },
    // 查询合同付款信息
    QueryProjectReportPayInfo(data) {
        return postRequest(baseUrl + "QueryProjectReportPayInfo", data);
    },
    // 查询计量合同付款()
    QueryProjectReportEngineeringPay(data) {
        return postRequest(baseUrl + "QueryProjectReportEngineeringPay", data);
    },
    // 查询计量合同付款累计已付款统计()
    QueryProjectReportEngineeringPayed(data) {
        return postRequest(baseUrl + "QueryProjectReportEngineeringPayed", data);
    },
    // 导入计量合同付款()
    ImportProjectReportEngineeringPay(data) {
        return postRequest(baseUrl + "ImportProjectReportEngineeringPay", data);
    },
    // 查询历史付款银行
    QueryProjectReportHistoryBank(data) {
        return postRequest(baseUrl + "QueryProjectReportHistoryBank", data);
    },

};
