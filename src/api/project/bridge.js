import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";
export default {
	//查询桥梁构件信息
	queryBridgeBuild(data) {
		return postRequest(baseUrl + 'QueryBridgeBuild', data);
	},
	// 删除桥梁构件信息
	delBridgeBuild(data) {
		return postRequest(baseUrl + 'DelBridgeBuild', data)
	},
	// 修改桥梁构件信息
	updateBridgeBuild(data) {
		return postRequest(baseUrl + 'UpdateBridgeBuild', data)
    },
    // 上传桥梁构件信息
	uploadBridgeBuild(data) {
		return postRequest(baseUrl + 'UploadBridgeBuild', data)
    },
    // 查询桥梁子单位工程
    queryBridgeSubUnit(data) {
		return postRequest(baseUrl + 'QueryBridgeSubUnit', data)
    },
    // 删除桥梁子单位工程
    delBridgeSubUnit(data) {
		return postRequest(baseUrl + 'DelBridgeSubUnit', data)
    },
    // 修改桥梁子单位工程
    updateBridgeSubUnit(data) {
		return postRequest(baseUrl + 'UpdateBridgeSubUnit', data)
    },
    // 上传桥梁子单位工程
    uploadBridgeSubUnit(data) {
		return postRequest(baseUrl + 'UploadBridgeSubUnit', data)
    },
    // 查询桥梁单位工程
    queryBridgeUnitProject(data) {
		return postRequest(baseUrl + 'QueryBridgeUnitProject', data)
    },
    // 删除桥梁单位工程
    delBridgeUnitProject(data) {
		return postRequest(baseUrl + 'DelBridgeUnitProject', data)
    },
    // 修改桥梁单位工程
    updateBridgeUnitProject(data) {
		return postRequest(baseUrl + 'UpdateBridgeUnitProject', data)
    },
    // 上传桥梁单位工程
    uploadBridgeUnitProject(data) {
		return postRequest(baseUrl + 'UploadBridgeUnitProject', data)
    },
}
