import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 查询困难职工-列表
    queryUnionPartyHardWorkerList(data) {
        return postRequest(baseUrl + "QueryUnionPartyHardWorkerList", data);
    },
    // 查询困难职工
    queryUnionPartyHardWorker(data) {
        return postRequest(baseUrl + "QueryUnionPartyHardWorker", data);
    },
    // 设置困难职工的编号和困难等级
    updateUnionPartyHardWorkerExt(data) {
        return postRequest(baseUrl + "UpdateUnionPartyHardWorkerExt", data);
    },
    // 设置困难职工的解除状态
    updateUnionPartyHardWorkerSTATE(data) {
        return postRequest(baseUrl + "UpdateUnionPartyHardWorkerSTATE", data);
    },
    // 修改困难职工(申请列表)
    updateUnionPartyHardWorker(data) {
        return postRequest(baseUrl + "UpdateUnionPartyHardWorker", data);
    },
    // 修改困难职工(档案列表)
    updateUnionPartyHardWorkerFile(data) {
        return postRequest(baseUrl + "UpdateUnionPartyHardWorkerFile", data);
    },
    // 上传困难职工
    uploadUnionPartyHardWorker(data) {
        return postRequest(baseUrl + "UploadUnionPartyHardWorker", data);
    },

    // 导入困难职工
    importUnionPartyHardWorker(data) {
        return postRequest(baseUrl + "ImportUnionPartyHardWorker", data);
    },
    // 删除困难职工
    delUnionPartyHardWorker(data) {
        return postRequest(baseUrl + "DelUnionPartyHardWorker", data);
    },
    // 修改签领管理状态
    updateUnionPartySubsidyState(data) {
        return postRequest(baseUrl + "UpdateUnionPartySubsidyState", data);
    },
    //------------------------------工会管理公示---------------------------//

    // 查询工会管理公示()
    queryUnionPartyPublicity(data) {
        return postRequest(baseUrl + "QueryUnionPartyPublicity", data);
    },

    // 审批工会管理公示()
    approveUnionPartyPublicity(data) {
        return postRequest(baseUrl + "ApproveUnionPartyPublicity", data);
    },
    // 上传工会管理公示()
    uploadUnionPartyPublicity(data) {
        return postRequest(baseUrl + "UploadUnionPartyPublicity", data);
    },

    // 查询工会管理-所有公示(困难职工，金秋助学)
    queryUnionPartyPublicityUnion(data) {
        return postRequest(baseUrl + "QueryUnionPartyPublicityUnion", data);
    },
};
