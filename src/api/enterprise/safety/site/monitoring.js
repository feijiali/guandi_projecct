import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 监控量测
export default {
    // 上传监控量测
    uploadSafeMonitorMeasure(data) {
        return postRequest(baseUrl + "UploadSafeMonitorMeasure", data);
    },
    // 导入监控量测
    importSafeMonitorMeasure(data) {
        return postRequest(baseUrl + "ImportSafeMonitorMeasure", data);
    },
    // 修改监控量测
    updateSafeMonitorMeasure(data) {
        return postRequest(baseUrl + "UpdateSafeMonitorMeasure", data);
    },
    // 删除监控量测
    delSafeMonitorMeasure(data) {
        return postRequest(baseUrl + "DelSafeMonitorMeasure", data);
    },
    // 查询监控量测
    querySafeMonitorMeasure(data) {
        return postRequest(baseUrl + "QuerySafeMonitorMeasure", data);
    },
    // 查询监控量测- 查询测点/工程部位
    querySafeMonitorMeasurePartOrPoint(data) {
        return postRequest(baseUrl + "QuerySafeMonitorMeasurePartOrPoint", data);
    }

};
