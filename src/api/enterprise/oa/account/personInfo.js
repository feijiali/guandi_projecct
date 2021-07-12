import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 查询人员详情
    queryAccountDetails(data) {
        return postRequest(baseUrl + "QueryAccountDetails", data);
    },
    // 离职人员
    resignationAccount(data) {
        return postRequest(baseUrl + "ResignationAccount", data);
    },
    // 查询人员+角色
    queryAccountRole(data) {
        return postRequest(baseUrl + "QueryAccountRole", data);
    },
    // 修改人员+角色
    updateAccountRole(data) {
        return postRequest(baseUrl + "UpdateAccountRole", data);
    },
    // 上传人员+角色
    uploadAccountRole(data) {
        return postRequest(baseUrl + "UploadAccountRole", data);
    },
    // 导入人员
    importAccount(data) {
        return postRequest(baseUrl + "ImportAccount", data);
    },
    // 修改签名
    updateSign(data) {
        return postRequest(baseUrl + "UpdateSign", data);
    },
    // 查询社保公司
    queryAccountLedger(data) {
        return postRequest(baseUrl + "QueryAccountLedger", data);
    },
    // 查询人员调动
    queryStaffStaffTransfer(data) {
        return postRequest(baseUrl + "QueryStaffStaffTransfer", data);
    },

};
