
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 质量管理
export default {
    /**********日常巡检*********/
    // 上传巡检详情表()
  uploadQuantityDailyInspection(data) {
    return postRequest(baseUrl + 'UploadQuantityDailyInspection', data);
  },
  // 修改巡检详情表(整改回复,复检回复)()
  updateQuantityDailyInspection(data) {
    return postRequest(baseUrl + 'UpdateQuantityDailyInspection', data);
  },
  // 删除巡检详情表()
  delQuantityDailyInspection(data) {
    return postRequest(baseUrl + 'DelQuantityDailyInspection', data);
  },
  // 查询巡检表()
  queryQuantityDailyInspection(data) {
    return postRequest(baseUrl + 'QueryQuantityDailyInspection', data);
  },
  // 查询年统计()
  queryQuantityInspectionYearSummary(data) {
    return postRequest(baseUrl + 'QueryQuantityInspectionYearSummary', data);
  },
//   日常巡检与整改次数统计()
queryQuantityInspectionRectificationStat(data) {
    return postRequest(baseUrl + 'QueryQuantityInspectionRectificationStat', data);
  },
    /**********质量整改*********/
    // 上传质量整改
    uploadQualityRectify(data) {
        return postRequest(baseUrl + 'UploadQualityRectify', data);
    },
    // 修改质量整改
    updateQualityRectify(data) {
        return postRequest(baseUrl + 'UpdateQualityRectify', data);
    },
    // 删除质量整改
    delQualityRectify(data) {
        return postRequest(baseUrl + 'DelQualityRectify', data);
    },
    // 查询质量整改
    queryQualityRectify(data) {
        return postRequest(baseUrl + 'QueryQualityRectify', data);
    },
    // 查询质量整改统计(按年统计每月数、按月统计每天次数)
    queryQualityRectifyStat(data) {
        return postRequest(baseUrl + 'QueryQualityRectifyStat', data);
    },
    // 查询质量整改地点
    queryQualityRectifyPosition(data) {
        return postRequest(baseUrl + 'QueryQualityRectifyPosition', data);
    },



    /**********工序检查*********/
    // 上传工序检查
    uploadQualityProcessInspection(data) {
        return postRequest(baseUrl + 'UploadQualityProcessInspection', data);
    },
    // 修改工序检查
    updateQualityProcessInspection(data) {
        return postRequest(baseUrl + 'UpdateQualityProcessInspection', data);
    },
    // 删除工序检查
    delQualityProcessInspection(data) {
        return postRequest(baseUrl + 'DelQualityProcessInspection', data);
    },
    // 查询工序检查
    queryQualityProcessInspection(data) {
        return postRequest(baseUrl + 'QueryQualityProcessInspection', data);
    },
    // 查询工序检查详情
    queryQualityProcessInspectionInfo(data) {
        return postRequest(baseUrl + 'QueryQualityProcessInspectionInfo', data);
    },
    // 审核工序检查
    approvalQualityProcessInspection(data) {
        return postRequest(baseUrl + 'ApprovalQualityProcessInspection', data);
    },
    // 查询工序检查-月统计
    queryQualityProcessInspectionMonthSummary(data) {
        return postRequest(baseUrl + 'QueryQualityProcessInspectionMonthSummary', data);
    },

    /************质量整改回复*********/
    // 质量整改回复
    uploadQualityRectifyReply(data) {
        return postRequest(baseUrl + 'UploadQualityRectifyReply', data);
    },
    // 驳回整改回复
    denyQualityRectifyReply(data) {
        return postRequest(baseUrl + 'DenyQualityRectifyReply', data);
    },
    // 删除整改回复
    delQualityRectifyReply(data) {
        return postRequest(baseUrl + 'DelQualityRectifyReply', data);
    },
    // 查询整改回复
    queryQualityRectifyReply(data) {
        return postRequest(baseUrl + 'QueryQualityRectifyReply', data);
    },

    // 导出安全整改
    exportQualityRectify(data) {
        return postRequest(baseUrl + 'ExportQualityRectify', data);
    },
    // 导出日常巡检
    exportQualityDailyInspection(data) {
        return postRequest(baseUrl + 'ExportQualityDailyInspection', data);
    },

    /************智慧梁场*********/
    // 查询日进度、梁片明细
    queryWisdomBeamDailyProgressInfo(data) {
        return postRequest(baseUrl + 'QueryWisdomBeamDailyProgressInfo', data);
    },
    // 修改日进度、梁片明细
    updateWisdomBeamDailyProgressInfo(data) {
        return postRequest(baseUrl + 'UpdateWisdomBeamDailyProgressInfo', data);
    },
    // 删除日进度、梁片明细
    delWisdomBeamDailyProgressInfo(data) {
        return postRequest(baseUrl + 'DelWisdomBeamDailyProgressInfo', data);
    },


    // 查询梁场信息
    queryWisdomBeamBeamField(data) {
        return postRequest(baseUrl + 'QueryWisdomBeamBeamField', data);
    },
    // 删除梁场信息
    delWisdomBeamBeamField(data) {
        return postRequest(baseUrl + 'DelWisdomBeamBeamField', data);
    },
    // 修改梁场信息
    updateWisdomBeamBeamField(data) {
        return postRequest(baseUrl + 'UpdateWisdomBeamBeamField', data);
    },
    // 上传梁场信息
    uploadWisdomBeamBeamField(data) {
        return postRequest(baseUrl + 'UploadWisdomBeamBeamField', data);
    },
    QueryQualityPress(data) {
        return postRequest(baseUrl + 'QueryQualityPress', data);
    },
    QueryQualityConcrete(data) {
        return postRequest(baseUrl + 'QueryQualityConcrete', data);
    },
    QueryQualityConcrete(data) {
        return postRequest(baseUrl + 'QueryQualityConcrete', data);
    },
    ExportQualityPress(data) {
        return postRequest(baseUrl + 'ExportQualityPress', data);
    },
    ExportQualityConcrete(data) {
        return postRequest(baseUrl + 'ExportQualityConcrete', data);
    },
    /************技术交底*********/
    // 查询质量技术交底
    queryQualityQualityTechConfess(data) {
        return postRequest(baseUrl + 'QueryQualityQualityTechConfess', data);
    },
    // 上传质量技术交底
    uploadQualityQualityTechConfess(data) {
        return postRequest(baseUrl + 'UploadQualityQualityTechConfess', data);
    },
    // 修改质量技术交底
    updateQualityQualityTechConfess(data) {
        return postRequest(baseUrl + 'UpdateQualityQualityTechConfess', data);
    },
    //删除质量技术交底
    delQualityQualityTechConfess(data) {
        return postRequest(baseUrl + 'DelQualityQualityTechConfess', data);
    },
    /************试验管理*********/
    // 查询试验管控-列表
    queryQualityTestControlList(data) {
        return postRequest(baseUrl + 'QueryQualityTestControlList', data);
    },
    // 上传试验管控
    uploadQualityTestControl(data) {
        return postRequest(baseUrl + 'UploadQualityTestControl', data);
    },
    // 修改试验管控
    updateQualityTestControl(data) {
        return postRequest(baseUrl + 'UpdateQualityTestControl', data);
    },
    // 修改试验管控-文件信息
    updateQualityTestControlFile(data) {
        return postRequest(baseUrl + 'UpdateQualityTestControlFile', data);
    },

    // 删除试验管控
    delQualityTestControl(data) {
        return postRequest(baseUrl + 'DelQualityTestControl', data);
    },
}
