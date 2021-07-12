
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
	/*********************文档管理***********************/
    // 查询模块文件
    queryFilesModuleFile(data){
    	return postRequest(baseUrl + 'QueryFilesModuleFile', data);
    },
	// 删除模块文件
	delFilesModuleFile(data){
    	return postRequest(baseUrl + 'DelFilesModuleFile', data);
    },
	// 修改模块文件
	updateFilesModuleFile(data){
		return postRequest(baseUrl + 'UpdateFilesModuleFile', data);
    },
    // 上传模块文件
   uploadFilesModuleFile(data){
		return postRequest(baseUrl + 'UploadFilesModuleFile', data);
	},
	// 导出
	exportFilesModuleFile(data){
		return postRequest(baseUrl + 'ExportFilesModuleFile', data);
	},
	// 查询人员以及对应的三级文件
	queryAccountFile(data){
		return postRequest(baseUrl + 'QueryAccountFile', data);
	},
	// 查询关联对象
	queryFilesModuleTeamName(data){
		return postRequest(baseUrl + 'QueryFilesModuleTeamName', data);
	},
	
}