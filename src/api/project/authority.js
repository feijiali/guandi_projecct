import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 权限配置模块
export default {
    // 上传角色
    uploadRole(data) {
        return postRequest(baseUrl + 'UploadRole', data);
    },
    // 修改角色
    updateRole(data) {
        return postRequest(baseUrl + 'UpdateRole', data);
    },
    // 删除角色
    delRole(data) {
        return postRequest(baseUrl + 'DelRole', data);
    },
    // 查询角色
    queryRole(data) {
        return postRequest(baseUrl + 'QueryRole', data);
    },
    // 是否启用
    updateRoleStatus(data) {
        return postRequest(baseUrl + 'UpdateRoleStatus', data);
    },
    // 查询权限
    queryAuthority(data) {
        return postRequest(baseUrl + 'QueryAuthority', data);
    },
    // 查询权限
    queryAuthorityModuleAction(data) {
        return postRequest(baseUrl + 'QueryAuthorityModuleAction', data);
    },
    queryRoleAction(data) {
        return postRequest(baseUrl + 'QueryRoleAction', data);
    },
    // 
    queryActionRelation(data) {
        return postRequest(baseUrl + 'QueryActionRelation', data);
    },
    queryFullAction(data) {
        return postRequest(baseUrl + 'QueryFullAction', data);
    }
}
