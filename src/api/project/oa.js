import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";
// oa管理
export default {
	// 上传OA
	uploadOAManageOA(data) {
		return postRequest(baseUrl + 'UploadOAManageOA', data);
	},
	// 修改OA
	updateOAManageOA(data) {
		return postRequest(baseUrl + 'UpdateOAManageOA', data);
	},
	// 删除OA
	delOAManageOA(data) {
		return postRequest(baseUrl + 'DelOAManageOA', data);
  },
  	// 查询OA-列表(
	queryOAManageOAList(data) {
		return postRequest(baseUrl + 'QueryOAManageOAList', data);
	},
// 现场资料
  queryFilesSiteInfo(data) {
    return postRequest(baseUrl + "QueryFilesSiteInfo", data);
  },
}
