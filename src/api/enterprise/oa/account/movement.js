import { postRequest } from '@/api/axios'
import $C from '@/common/config'
let baseUrl = $C.baseUrl + '?op='

// 人员调动
export default {
    // 查询人员调动
    queryStaffMobilize(data) {
        return postRequest(baseUrl + 'QueryStaffMobilize', data)
    },
    // 修改人员调动
    updateStaffMobilize(data) {
        return postRequest(baseUrl + 'UpdateStaffMobilize', data)
    },
    // 上传人员调动
    uploadStaffMobilize(data) {
        return postRequest(baseUrl + 'UploadStaffMobilize', data)
    },
    // 删除人员调动
    delStaffMobilize(data) {
        return postRequest(baseUrl + 'DelStaffMobilize', data)
    },
    // 导出人员调动
    ExportStaffMobilize(data) {
        return postRequest(baseUrl + 'ExportStaffMobilize', data)
    }
}
