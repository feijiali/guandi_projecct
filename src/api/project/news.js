import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 组织架构模块
export default {
	// 查询个人消息(列表+分页)
	queryMessageMsg(data) {
		return postRequest(baseUrl + 'QueryMessageMsg', data);
	},
	// 编辑个人消息
	updateMessageMsg(data) {
		return postRequest(baseUrl + 'UpdateMessageMsg', data);
	},
	// 删除个人消息
	delMessageMsg(data) {
		return postRequest(baseUrl + 'DelMessageMsg', data);
	}
}
