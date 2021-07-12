import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';
export default {
	//// 设备模块
	//查询设备统计
	queryEquipmentDeviceSummary(data) {
        return postRequest(baseUrl + 'QueryEquipmentDeviceSummary_TJSTC', data);
    },
	// 查询设备
	queryEquipmentDevice(data) {
        return postRequest(baseUrl + 'QueryEquipmentDevice_TJSTC', data);
    },
	// 编辑设备
	updateEquipmentDevice(data){
		return postRequest(baseUrl + 'UpdateEquipmentDevice_TJSTC', data);
	},
	// 上传设备
	uploadEquipmentDevice(data){
		return postRequest(baseUrl + 'UploadEquipmentDevice_TJSTC', data);
	},
	// 删除设备
	delEquipmentDevice(data){
		return postRequest(baseUrl + 'DelEquipmentDevice_TJSTC', data);
	},
	// 导出设备
	exportEquipmentSpecDevice(data){
		return postRequest(baseUrl + 'ExportEquipmentSpecDevice_TJSTC', data);
	},
//***************************深基坑**********************
	//查询基坑统计告警总数
	queryEquipmentFoundationDitchStatAll(data) {
		return postRequest(baseUrl + 'QueryEquipmentFoundationDitchStatAll_TJSTC', data);
	},
	//查询基坑数据细节
	queryEquipmentFoundationDitchInfo(data) {
		return postRequest(baseUrl + 'QueryEquipmentFoundationDitchInfo_TJSTC', data);
	},
	//查询基坑测点名称
	queryEquipmentFoundationDitchPoint(data) {
		return postRequest(baseUrl + 'QueryEquipmentFoundationDitchPoint_TJSTC', data);
	},
	//查询基坑预警报警统计（按日期统计返回
	queryEquipmentFoundationDitchStat(data) {
		return postRequest(baseUrl + 'QueryEquipmentFoundationDitchStat_TJSTC', data);
	},
	//查询基坑
	queryEquipmentFoundationDitch(data) {
		return postRequest(baseUrl + 'QueryEquipmentFoundationDitch_TJSTC', data);
	},
//***************************硬件设备信息管理**********************
	//查询设备
	queryEquipmentHardware(data) {
		return postRequest(baseUrl + 'QueryEquipmentHardware_TJSTC', data);
	},
	//上传设备
	uploadEquipmentHardware(data) {
		return postRequest(baseUrl + 'UploadEquipmentHardware_TJSTC', data);
	},
	//修改设备
	updateEquipmentHardware(data) {
		return postRequest(baseUrl + 'UpdateEquipmentHardware_TJSTC', data);
	},
	//删除设备
	delEquipmentHardware(data) {
		return postRequest(baseUrl + 'DelEquipmentHardware_TJSTC', data);
	},
	//修改硬件设备状态
	updateEquipmentHardwareState(data) {
		return postRequest(baseUrl + 'UpdateEquipmentHardwareState_TJSTC', data);
	},
//***************************塔吊**********************
	//查询塔吊吊重
	queryEquipmentTcWeight(data) {
		return postRequest(baseUrl + 'QueryEquipmentTcWeight_TJSTC', data);
	},
	//导出塔吊吊重
	exportEquipmentTcWeight(data) {
		return postRequest(baseUrl + 'ExportEquipmentTcWeight_TJSTC', data);
	},
	//查询查询塔吊运行
	queryEquipmentTowerCrance(data) {
		return postRequest(baseUrl + 'QueryEquipmentTowerCrance_TJSTC', data);
	},
	//导出塔吊运行
	exportEquipmentTowerCrance(data) {
		return postRequest(baseUrl + 'ExportEquipmentTowerCrance_TJSTC', data);
	},
	//查询塔吊/吊重 预警状态
	queryEquipmentTcWeightUnionTC(data) {
		return postRequest(baseUrl + 'QueryEquipmentTcWeightUnionTC_TJSTC', data);
	},
	//查询塔吊/吊重 预警统计
	queryEquipmentTcWeightUnionTCSummary(data) {
		return postRequest(baseUrl + 'QueryEquipmentTcWeightUnionTCSummary_TJSTC', data);
	},
}
