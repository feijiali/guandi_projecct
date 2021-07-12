import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';
// 安全模块
export default {
    /********************气体检测***********************/
    //查询月度统计
    queryGasDetectSensorRecordDuration(data) {
        return postRequest(baseUrl + 'QueryGasDetectSensorRecordDuration', data);
    },
    //查询感知数据
    queryGasDetectSensorRecord(data) {
        return postRequest(baseUrl + 'QueryGasDetectSensorRecord', data);
    },
    //查询安全考核
    querySafeExamine(data) {
        return postRequest(baseUrl + 'QuerySafeExamine', data);
    },
    //查询安全考核类型
    querySafeExamineType(data) {
        return postRequest(baseUrl + 'QuerySafeExamineType', data);
    },
    //上传安全考核
    uploadSafeExamine(data) {
        return postRequest(baseUrl + 'UploadSafeExamine', data);
    },
    //编辑安全考核
    updateSafeExamine(data) {
        return postRequest(baseUrl + 'UpdateSafeExamine', data);
    },
    //删除安全考核
    delSafeExamine(data) {
        return postRequest(baseUrl + 'DelSafeExamine', data);
    },
    //查询安全交底
    querySafeCommunicate(data) {
        return postRequest(baseUrl + 'QuerySafeCommunicate', data);
    },
    //查询安全交底类型
    querySafeCommunicateType(data) {
        return postRequest(baseUrl + 'QuerySafeCommunicateType', data);
    },
    //上传安全交底
    uploadSafeCommunicate(data) {
        return postRequest(baseUrl + 'UploadSafeCommunicate', data);
    },
    //编辑安全交底
    updateSafeCommunicate(data) {
        return postRequest(baseUrl + 'UpdateSafeCommunicate', data);
    },
    //删除安全交底
    delSafeCommunicate(data) {
        return postRequest(baseUrl + 'DelSafeCommunicate', data);
    },
    //上传安全演练
    uploadSafeDrill(data) {
        return postRequest(baseUrl + 'UploadSafeDrill', data);
    },
    //编辑安全演练
    updateSafeDrill(data) {
        return postRequest(baseUrl + 'UpdateSafeDrill', data);
    },
    //查询安全演练列表
    querySafeDrillList(data) {
        return postRequest(baseUrl + 'QuerySafeDrillList', data);
    },
    //查询安全演练
    querySafeDrill(data) {
        return postRequest(baseUrl + 'QuerySafeDrill', data);
    },
    //删除安全演练
    delSafeDrill(data) {
        return postRequest(baseUrl + 'DelSafeDrill', data);
    },
    //上传年度计划
    uploadSafeAnnualPlan(data) {
        return postRequest(baseUrl + 'UploadSafeAnnualPlan', data);
    },
    //编辑年度计划
    updateSafeAnnualPlan(data) {
        return postRequest(baseUrl + 'UpdateSafeAnnualPlan', data);
    },
    //查询年度计划列表
    querySafeAnnualPlanList(data) {
        return postRequest(baseUrl + 'QuerySafeAnnualPlanList', data);
    },
    //查询年度计划
    querySafeAnnualPlan(data) {
        return postRequest(baseUrl + 'QuerySafeAnnualPlan', data);
    },
    //删除年度计划
    delSafeAnnualPlan(data) {
        return postRequest(baseUrl + 'DelSafeAnnualPlan', data);
    },
    //查询教育培训次数统计
    querySafeStat(data){
        return postRequest(baseUrl + 'QuerySafeStat', data);
    },
    //查询用电预警次数统计
    queryEquipmentElecMonitorSummary_TJSTC(data){
        return postRequest(baseUrl + 'QueryEquipmentElecMonitorSummary_TJSTC', data);
    },
    //查询违章抓拍预警次数统计
    querySafeSnapshotSummary(data){
        return postRequest(baseUrl + 'QuerySafeSnapshotSummary', data);
    },
    //查询日常巡检统计与整改次数统计
    querySafeInspectionRectificationStat(data){
        return postRequest(baseUrl + 'QuerySafeInspectionRectificationStat', data);
    },
    //冠迪摄像头结构
    queryYsyVideo2(data){
        return postRequest(baseUrl + 'QueryYsyVideo2', data);
    },
    //删除违章抓拍
    delSafeSnapshot(data){
        return postRequest(baseUrl + 'DelSafeSnapshot', data);
    },
    //查询违章抓拍设备
    querySafeSnapshotDeviceLocation(data){
        return postRequest(baseUrl + 'QuerySafeSnapshotDeviceLocation', data);
    },
}