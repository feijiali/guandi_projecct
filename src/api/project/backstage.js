import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 权限配置模块
export default {

	//查询模块关系(列表+分页)(QueryRelation)
	queryRelation(data) {
		return postRequest(baseUrl + 'QueryRelation', data);
	},
	// 查询模块关系
	queryRelationTree(data) {
		return postRequest(baseUrl + 'QueryRelationTree', data);
	},
	// 查询基本模块
	queryBasis(data) {
		return postRequest(baseUrl + 'QueryBasis', data);
	},
	// 编辑模块关系
	updateRelation(data) {
		return postRequest(baseUrl + 'UpdateRelation', data);
	},
	// 上传模块关系
	uploadRelation(data) {
		return postRequest(baseUrl + 'UploadRelation', data);
	},
	// 删除模块‘
	delRelation(data) {
		return postRequest(baseUrl + 'DelRelation', data);
	},
	// 删除物理模块
	delBasis(data) {
		return postRequest(baseUrl + 'DelBasis', data);
	},
	queryUnusedBasis(data) {
		return postRequest(baseUrl + 'QueryUnusedBasis', data);
	},
	// 查询模块树
	queryRelationActionTree(data) {
		return postRequest(baseUrl + 'QueryRelationActionTree', data)
	},
	// 查询基础模块与操作行为
	queryBasisAndAction(data) {
		return postRequest(baseUrl + 'QueryBasisAndAction', data)
	},
	// 删除基础模块与操作行为
	delBasisAndAction(data) {
		return postRequest(baseUrl + 'DelBasisAndAction', data)
	},
	// 上传基础模块与操作行为
	uploadBasisAndAction(data) {
		return postRequest(baseUrl + 'UploadBasisAndAction', data)
	},
	// 修改基础模块与操作行为
	updateBasisAndAction(data) {
		return postRequest(baseUrl + 'UpdateBasisAndAction', data)
	},
	// 查询基础模块与操作行为所有
	queryRelationAll(data) {
		return postRequest(baseUrl + 'QueryRelationAll', data)
	}
}
