/*
 * @Autor: 邓易
 * @Date: 2021-03-18 16:19:24
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-25 11:48:26
 */
import { postRequest } from '@/api/axios'
import $C from '@/common/config'
let baseUrl = $C.baseUrl + '?op='
export default {
    // 导入自有设备
    ImportEquipmentStandingBook(data) {
        return postRequest(baseUrl + 'ImportEquipmentStandingBook', data)
    },
    // 查询自有设备
    QueryEquipmentStandingBookList(data) {
        return postRequest(baseUrl + 'QueryEquipmentStandingBookList', data)
    },
    // 查询自有设备部门
    QueryEquipmentStandingBookDepart(data) {
        return postRequest(baseUrl + 'QueryEquipmentStandingBookDepart', data)
    },
    // 查询生产厂家
    QueryEquipmentStandingBookFactory(data) {
        return postRequest(baseUrl + 'QueryEquipmentStandingBookFactory', data)
    },
    // 查询生产能力
    QueryEquipmentStandingBookLevel(data) {
        return postRequest(baseUrl + 'QueryEquipmentStandingBookLevel', data)
    },
    // 查询购置年限
    QueryEquipmentStandingBookYear(data) {
        return postRequest(baseUrl + 'QueryEquipmentStandingBookYear', data)
    },
    // 编辑自有设备
    UpdateEquipmentStandingBook(data) {
        return postRequest(baseUrl + 'UpdateEquipmentStandingBook', data)
    },
    // 删除自有设备
    DelEquipmentStandingBook(data) {
        return postRequest(baseUrl + 'DelEquipmentStandingBook', data)
    },
    // 导出自有设备
    ExportEquipmentStandingBook(data) {
        return postRequest(baseUrl + 'ExportEquipmentStandingBook', data)
    },

    // 导入租赁设备
    ImportEquipmentLeaseStandingBook(data) {
        return postRequest(baseUrl + 'ImportEquipmentLeaseStandingBook', data)
    },
    // 查询租赁设备
    QueryEquipmentLeaseStandingBookList(data) {
        return postRequest(baseUrl + 'QueryEquipmentLeaseStandingBookList', data)
    },
    // 查询租赁设备部门
    QueryEquipmentLeaseStandingBookDepart(data) {
        return postRequest(baseUrl + 'QueryEquipmentLeaseStandingBookDepart', data)
    },
    // 编辑租赁设备
    UpdateEquipmentLeaseStandingBook(data) {
        return postRequest(baseUrl + 'UpdateEquipmentLeaseStandingBook', data)
    },
    // 删除租赁设备
    DelEquipmentLeaseStandingBook(data) {
        return postRequest(baseUrl + 'DelEquipmentLeaseStandingBook', data)
    },
    // 导出租赁设备
    ExportEquipmentLeaseStandingBook(data) {
        return postRequest(baseUrl + 'ExportEquipmentLeaseStandingBook', data)
    },
    //查询首页设备统计
    QueryEquipmentStat(data) {
        return postRequest(baseUrl + 'QueryEquipmentStat', data)
    },

    // 导入材料收发汇总
    ImportMaterialStandingBook(data) {
        return postRequest(baseUrl + 'ImportMaterialStandingBook', data)
    },
    // 查询材料收发汇总
    QueryMaterialStandingBookList(data) {
        return postRequest(baseUrl + 'QueryMaterialStandingBookList', data)
    },
    // 删除材料收发汇总
    DelMaterialStandingBook(data) {
        return postRequest(baseUrl + 'DelMaterialStandingBook', data)
    },
    // 编辑材料收发汇总
    UpdateMaterialStandingBook(data) {
        return postRequest(baseUrl + 'UpdateMaterialStandingBook', data)
    },
    // 导出材料收发汇总
    ExportMaterialStandingBook(data) {
        return postRequest(baseUrl + 'ExportMaterialStandingBook', data)
    },

    // 导入费用汇总
    ImportMaterialMoneyStandingBook(data) {
        return postRequest(baseUrl + 'ImportMaterialMoneyStandingBook', data)
    },
    // 查询费用汇总
    QueryMaterialMoneyStandingBookList(data) {
        return postRequest(baseUrl + 'QueryMaterialMoneyStandingBookList', data)
    },
    // 修改费用汇总
    UpdateMaterialMoneyStandingBook(data) {
        return postRequest(baseUrl + 'UpdateMaterialMoneyStandingBook', data)
    },
    // 删除费用汇总
    DelMaterialMoneyStandingBook(data) {
        return postRequest(baseUrl + 'DelMaterialMoneyStandingBook', data)
    },
    // 部门查询
    QueryMaterialMoneyStandingBookDepart(data) {
        return postRequest(baseUrl + 'QueryMaterialMoneyStandingBookDepart', data)
    },
    // 导出费用汇总
    ExportMaterialMoneyStandingBook(data) {
        return postRequest(baseUrl + 'ExportMaterialMoneyStandingBook', data)
    }
}
