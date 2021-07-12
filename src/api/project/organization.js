import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 组织架构模块
export default {
	// 查询机构(列表+分页)
	queryOrgan(data) {
		return postRequest(baseUrl + 'QueryOrgan', data);
	},
	// 获取组织架构
	queryOrganTree(data) {
		return postRequest(baseUrl + 'QueryOrganTree', data);
	},
	// 查询单位公司
	queryOrganCompany(data) {
		return postRequest(baseUrl + 'QueryOrganCompany', data);
	},
	// 上传组织机构
	uploadOrgan(data) {
		return postRequest(baseUrl + 'UploadOrgan', data);
	},
	// 编辑组织架构
	updateOrgan(data) {
		return postRequest(baseUrl + 'UpdateOrgan', data);
	},
	// 删除机构
	delOrgan(data) {
		return postRequest(baseUrl + 'DelOrgan', data);
	},
	//查询人员所在的公司
	queryAccountToOrgan(data) {
		return postRequest(baseUrl + 'QueryAccountToOrgan', data);
	},
	// 查询工程项目（自营、合作）
	QueryOrganProjectTree(data) {
		return postRequest(baseUrl + 'QueryOrganProjectTree', data);
	}
}
