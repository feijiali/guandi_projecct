import { postRequest } from '@/api/axios'
import $C from '@/common/config'
let baseUrl = $C.baseUrl + '?op='

// 三类人员
export default {
    // 查询三类人员统计
    QueryStaffAccountThreeStat(data) {
        return postRequest(baseUrl + 'QueryStaffAccountThreeStat', data)
    },
    // 查询三类人员-列表
    QueryStaffAccountThreeList(data) {
        return postRequest(baseUrl + 'QueryStaffAccountThreeList', data)
    },
    // 导出三类人员-列表
    ExportStaffAccountThree(data) {
        return postRequest(baseUrl + 'ExportStaffAccountThree', data)
    }
}
