import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 查询党建管理
    queryUnionPartyFactionManage(data) {
        return postRequest(baseUrl + "QueryUnionPartyFactionManage", data);
    },
    // 查询党建管理-列表
    queryUnionPartyFactionManageList(data) {
        return postRequest(baseUrl + "QueryUnionPartyFactionManageList", data);
    },
    // 设置困难职工的编号和困难等级
    delUnionPartyFactionManage(data) {
        return postRequest(baseUrl + "DelUnionPartyFactionManage", data);
    },
    // 修改困难职工
    updateUnionPartyFactionManage(data) {
        return postRequest(baseUrl + "UpdateUnionPartyFactionManage", data);
    },
    // 上传困难职工
    uploadUnionPartyFactionManage(data) {
        return postRequest(baseUrl + "UploadUnionPartyFactionManage", data);
    },
    // 上传党员发展
    uploadUnionPartyPersonnelDevelop(data) {
        return postRequest(baseUrl + "UploadUnionPartyPersonnelDevelop", data);
    },
    // 修改党员发展
    updateUnionPartyPersonnelDevelop(data) {
        return postRequest(baseUrl + "UpdateUnionPartyPersonnelDevelop", data);
    },
    // 更新党员发展状态
    updateUnionPartyPersonnelDevelopStates(data) {
        return postRequest(baseUrl + "UpdateUnionPartyPersonnelDevelopStates", data);
    },
    // 上传/补充文件信息
    uploadUnionPartyPersonnelDevelopFile(data) {
        return postRequest(baseUrl + "UploadUnionPartyPersonnelDevelopFile", data);
    },
    // 删除党员发展
    delUnionPartyPersonnelDevelop(data) {
        return postRequest(baseUrl + "DelUnionPartyPersonnelDevelop", data);
    },
    // 查询党员发展-列表
    queryUnionPartyPersonnelDevelopList(data) {
        return postRequest(baseUrl + "QueryUnionPartyPersonnelDevelopList", data);
    },
    // 查询党员发展
    queryUnionPartyPersonnelDevelop(data) {
        return postRequest(baseUrl + "QueryUnionPartyPersonnelDevelop", data);
    },
};
