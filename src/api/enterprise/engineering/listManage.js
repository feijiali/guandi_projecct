import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";
export default {
    //工程量清单
    //查询工程量清单-列表
    QueryProjDetailListProjDetailMainList(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailMainList', data)
    },
    //查询工程量清单详情表-列表
    QueryProjDetailListProjDetailMainLsList(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailMainLsList', data)
    },
    //上传工程量清单
    UploadProjDetailListProjDetailMain(data) {
        return postRequest(baseUrl + 'UploadProjDetailListProjDetailMain', data)
    },
    //删除工程量清单
    DelProjDetailListProjDetailMain(data) {
        return postRequest(baseUrl + 'DelProjDetailListProjDetailMain', data)
    },
    //上传工程量清单详情表
    UploadProjDetailListProjDetailMainLs(data) {
        return postRequest(baseUrl + 'UploadProjDetailListProjDetailMainLs', data)
    },
    //修改工程量清单详情表
    UpdateProjDetailListProjDetailMainLs(data) {
        return postRequest(baseUrl + 'UpdateProjDetailListProjDetailMainLs', data)
    },
    //删除工程量清单详情表
    DelProjDetailListProjDetailMainLs(data) {
        return postRequest(baseUrl + 'DelProjDetailListProjDetailMainLs', data)
    },
    // 查询工程量清单详情表-设计变更里面用
    QueryProjDetailListProjDetailMainLsChange(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailMainLsChange', data)
    },
    // 查询拆分清单详情表-设计变更里面用
    QueryProjDetailListProjDetailSplitLsChange(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailSplitLsChange', data)
    },

    //拆分清单
    //查询拆分量清单-列表
    QueryProjDetailListProjDetailSplitList(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailSplitList', data)
    },
    //上传拆分量清单
    UploadProjDetailListProjDetailSplit(data) {
        return postRequest(baseUrl + 'UploadProjDetailListProjDetailSplit', data)
    },
    //删除拆分量清单
    DelProjDetailListProjDetailSplit(data) {
        return postRequest(baseUrl + 'DelProjDetailListProjDetailSplit', data)
    },
    //查询拆分量清单详情-列表
    QueryProjDetailListProjDetailSplitLsList(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailSplitLsList', data)
    },
    //修改拆分量清单详情
    UpdateProjDetailListProjDetailSplitLs(data) {
        return postRequest(baseUrl + 'UpdateProjDetailListProjDetailSplitLs', data)
    },
    //删除拆分量清单详情
    DelProjDetailListProjDetailSplitLs(data) {
        return postRequest(baseUrl + 'DelProjDetailListProjDetailSplitLs', data)
    },

    //分项清单
    //查询分项清单-列表
    QueryProjDetailListProjDetailDiffList(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailDiffList', data)
    },
    //查询编制范围
    QueryProjDetailListProjDetailDiffHis(data) {
        return postRequest(baseUrl + 'QueryProjDetailListProjDetailDiffHis', data)
    },
    //上传分项清单
    UploadProjDetailListProjDetailDiff(data) {
        return postRequest(baseUrl + 'UploadProjDetailListProjDetailDiff', data)
    },
    //修改分项清单
    UpdateProjDetailListProjDetailDiff(data) {
        return postRequest(baseUrl + 'UpdateProjDetailListProjDetailDiff', data)
    },
    //删除分项清单
    DelProjDetailListProjDetailDiff(data) {
        return postRequest(baseUrl + 'DelProjDetailListProjDetailDiff', data)
    },
}