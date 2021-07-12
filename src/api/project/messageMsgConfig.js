import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 消息配置
export default {
    // 查询消息配置
    queryMessageMsgConfig(data) {
        return postRequest(baseUrl + 'QueryMessageMsgConfig', data);
    },
    // 修改消息配置
    uploadMessageMsgConfig(data) {
        return postRequest(baseUrl + 'UploadMessageMsgConfig', data);
    },
    // 修改消息配置
    updateMessageMsgConfig(data) {
        return postRequest(baseUrl + 'UpdateMessageMsgConfig', data);
    },
    // 删除个人消息
    delMessageMsgConfig(data) {
        return postRequest(baseUrl + 'DelMessageMsgConfig', data);
    }
}
