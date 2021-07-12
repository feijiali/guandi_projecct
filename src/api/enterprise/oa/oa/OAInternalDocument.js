//----------------------- 内部文件 -------------------------------
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 查询内部文件
    QueryOAInternalDocument(data) {
        return postRequest(baseUrl + "QueryOAInternalDocument", data);
    },
    //   查询内部文件-列表
    QueryOAInternalDocumentList(data) {
        return postRequest(baseUrl + "QueryOAInternalDocumentList", data);
    },
    // 删除内部文件
    DelOAInternalDocument(data) {
        return postRequest(baseUrl + "DelOAInternalDocument", data);
    },
    // 修改内部文件
    UpdateOAInternalDocument(data) {
        return postRequest(baseUrl + "UpdateOAInternalDocument", data);
    },
    // 上传内部文件
    UploadOAInternalDocument(data) {
        return postRequest(baseUrl + "UploadOAInternalDocument", data);
    },
    // 导出内部文件
    ExportOAInternalDocument(data) {
        return postRequest(baseUrl + "ExportOAInternalDocument", data);
    },
};
