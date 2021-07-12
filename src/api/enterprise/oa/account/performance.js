import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 人员打卡
export default {
    // 查询人员考核表-列表
    queryPerformanceAssessorList(data) {
        return postRequest(baseUrl + "QueryPerformanceAssessorList", data);
    },
    // 查询人员考核表
    queryPerformanceAssessor(data) {
        return postRequest(baseUrl + "QueryPerformanceAssessor", data);
    },
    // 考核
    uploadPerformanceAssessorEvaluation(data) {
        return postRequest(baseUrl + "UploadPerformanceAssessorEvaluation", data);
    },
    // 修改考勤配置表
    uploadPerformanceBasic(data) {
        return postRequest(baseUrl + "UploadPerformanceBasic", data);
    },
    // 上传基础设置表
    uploadStaffPunchBasic(data) {
        return postRequest(baseUrl + "UploadStaffPunchBasic", data);
    },
    // 删除基础设置表
    delPerformanceBasic(data) {
        return postRequest(baseUrl + "DelPerformanceBasic", data);
    },
    // 查询基础设置表-带人员
    queryPerformanceBasic(data) {
        return postRequest(baseUrl + "QueryPerformanceBasic", data);
    },
    // 查询基础设置表-列表
    queryPerformanceBasicList(data) {
        return postRequest(baseUrl + "QueryPerformanceBasicList", data);
    },
    // 查询基础设置表-配置详情
    queryPerformanceBasicInfo(data) {
        return postRequest(baseUrl + "QueryPerformanceBasicInfo", data);
    },
    updatePerformanceBasicTime(data) {
        return postRequest(baseUrl + "UpdatePerformanceBasicTime", data);
    },
};
