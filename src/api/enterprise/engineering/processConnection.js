import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 工序衔接
export default {
    //   ----------------------------循环-------------------------------
    // 查询设置了工序的所有项目
    QueryProcessConvergeSetProj(data) {
        return postRequest(baseUrl + "QueryProcessConvergeSetProj", data);
    },
    // 查询设置了工序的所有子单元工程
    QueryProcessConvergeSetSubUnit(data) {
        return postRequest(baseUrl + "QueryProcessConvergeSetSubUnit", data);
    },
    // 查询循环详情
    QueryProcessConvergeCycleDetailList(data) {
        return postRequest(baseUrl + "QueryProcessConvergeCycleDetailList", data);
    },
    // 查询循环
    QueryProcessConvergeCycle(data) {
        return postRequest(baseUrl + "QueryProcessConvergeCycle", data);
    },
    // 查询循环列表
    QueryProcessConvergeCycleList(data) {
        return postRequest(baseUrl + "QueryProcessConvergeCycleList", data);
    },
    // 更改循环状态
    UpdateProcessConvergeCycleState(data) {
        return postRequest(baseUrl + "UpdateProcessConvergeCycleState", data);
    },
    // 删除循环
    DelProcessConvergeCycle(data) {
        return postRequest(baseUrl + "DelProcessConvergeCycle", data);
    },
    // 修改循环
    UpdateProcessConvergeCycle(data) {
        return postRequest(baseUrl + "UpdateProcessConvergeCycle", data);
    },
    // 导出工序循环详情列表
    exportProcessConvergeDetailList(data) {
        return postRequest(baseUrl + "ExportProcessConvergeDetailList", data);
    },
    // 导出工序用时列表
    exportProcessConvergeTime(data) {
        return postRequest(baseUrl + "ExportProcessConvergeTime", data);
    },
    // 导出工序排行列表
    exportProcessConvergeSort(data) {
        return postRequest(baseUrl + "ExportProcessConvergeSort", data);
    },
    // 出工序进尺排行列表
    exportProcessConvergeStat(data) {
        return postRequest(baseUrl + "ExportProcessConvergeStat", data);
    },
    //   ----------------------------工序设置-------------------------------
    // 查询工序设置
    QueryProcessConvergeSet(data) {
        return postRequest(baseUrl + "QueryProcessConvergeSet", data);
    },
    // 删除工序设置
    DelProcessConvergeSet(data) {
        return postRequest(baseUrl + "DelProcessConvergeSet", data);
    },
    // 上传工序设置
    UploadProcessConvergeSet(data) {
        return postRequest(baseUrl + "UploadProcessConvergeSet", data);
    },
    // 修改工序设置
    UpdateProcessConvergeSet(data) {
        return postRequest(baseUrl + "UpdateProcessConvergeSet", data);
    },
    //   ----------------------------工序定义-------------------------------
    // 查询工序定义
    QueryProcessConvergeProcedure(data) {
        return postRequest(baseUrl + "QueryProcessConvergeProcedure", data);
    },
    // 删除工序定义
    DelProcessConvergeProcedure(data) {
        return postRequest(baseUrl + "DelProcessConvergeProcedure", data);
    },
    // 修改工序定义
    UpdateProcessConvergeProcedure(data) {
        return postRequest(baseUrl + "UpdateProcessConvergeProcedure", data);
    },
    // 上传工序定义
    UploadProcessConvergeProcedure(data) {
        return postRequest(baseUrl + "UploadProcessConvergeProcedure", data);
    },

    //   ----------------------------机械配置-------------------------------
    // 查询机械配置
    QueryProcessConvergeMachine(data) {
        return postRequest(baseUrl + "QueryProcessConvergeMachine", data);
    },
    //删除机械配置
    DelProcessConvergeMachine(data) {
        return postRequest(baseUrl + "DelProcessConvergeMachine", data);
    },
    // 修改机械配置
    UpdateProcessConvergeMachine(data) {
        return postRequest(baseUrl + "UpdateProcessConvergeMachine", data);
    },
    // 上传机械配置
    UploadProcessConvergeMachine(data) {
        return postRequest(baseUrl + "UploadProcessConvergeMachine", data);
    },

    //   ----------------------------工序统计-------------------------------
    // 查询子单元工程的工序排行
    QueryProcessConvergeCycleSort(data) {
        return postRequest(baseUrl + "QueryProcessConvergeCycleSort", data);
    },
    // 查询子单元工程的进尺排行
    QueryProcessConvergeCycleStat(data) {
        return postRequest(baseUrl + "QueryProcessConvergeCycleStat", data);
    },
    // 查询子单元工程的实时工序
    QueryProcessConvergeRealTimeCycle(data) {
        return postRequest(baseUrl + "QueryProcessConvergeRealTimeCycle", data);
    },
    // 查询工序用时统计
    QueryProcessConvergeCycleTime(data) {
        return postRequest(baseUrl + "QueryProcessConvergeCycleTime", data);
    },
    //   ----------------------------工序施工-------------------------------
    // 查询工序施工
    QueryProcessConvergeBuild(data) {
        return postRequest(baseUrl + "QueryProcessConvergeBuild", data);
    },
    // 删除工序施工
    DelProcessConvergeBuild(data) {
        return postRequest(baseUrl + "DelProcessConvergeBuild", data);
    },
    // 修改工序施工
    UpdateProcessConvergeBuild(data) {
        return postRequest(baseUrl + "UpdateProcessConvergeBuild", data);
    },
    // 上传工序施工
    UploadProcessConvergeBuild(data) {
        return postRequest(baseUrl + "UploadProcessConvergeBuild", data);
    },
}

