import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 项目信息
export default {
  /*********************项目信息***********************/
  // 查询项目基本信息(QueryProjectInfoProject)
  queryProjectInfoProject(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProject', data)
  },
  // 删除项目基本信息
  delProjectInfoProject(data) {
    return postRequest(baseUrl + 'DelProjectInfoProject', data)
  },
  // 修改项目基本信息(UpdateProjectInfoProject)
  updateProjectInfoProject(data) {
    return postRequest(baseUrl + 'UpdateProjectInfoProject', data)
  },
  // 上传项目基本信息
  uploadProjectInfoProject(data) {
    return postRequest(baseUrl + 'UploadProjectInfoProject', data)
  },
  // 查询项目类型
  queryProjectInfoProjectType(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectType', data)
  },
  // 查询项目编号(唯一性)
  queryProjectInfoProjectNo(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectNo', data)
  },
  // 查询项目隶属机构
  QueryProjectInfoProjectSubordinate(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectSubordinate', data)
  },
  /*********************资源共享***********************/
  // 分部分项树
  queryProjectInfoProjectBuildTree(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectBuildTree', data)
  },
  queryProjectInfoBuildSort(data) {
    return postRequest(baseUrl + 'QueryProjectInfoBuildSort', data)
  },
  // 删除分部分项
  delProjectInfoProjectBuild(data) {
    return postRequest(baseUrl + 'DelProjectInfoProjectBuild', data)
  },
  // 上传树节点
  uploadProjectInfoProjectBuild(data) {
    return postRequest(baseUrl + 'UploadProjectInfoProjectBuild', data)
  },
  // 导入分部分项
  importProjectInfoProjectItem(data) {
    return postRequest(baseUrl + 'ImportProjectInfoProjectItem', data)
  },
  // 导出分部分项
  exportProjectBuildItem(data) {
    return postRequest(baseUrl + 'ExportProjectBuildItem', data)
  },
  // 查询单位工程信息集合
  queryProjectInfoProjectItemUnitProject(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectItemUnitProject', data)
  },
  // 上传单位工程
  uploadProjectInfoBridgeUnit(data) {
    return postRequest(baseUrl + 'UploadProjectInfoBridgeUnit', data)
  },
  // 修改单位工程
  updateProjectInfoBridgeUnit(data) {
    return postRequest(baseUrl + 'UpdateProjectInfoBridgeUnit', data)
  },
  // 删除单位工程
  delProjectInfoBridgeUnit(data) {
    return postRequest(baseUrl + 'DelProjectInfoBridgeUnit', data)
  },
  // 查询单位工程
  queryProjectInfoBridgeUnit(data) {
    return postRequest(baseUrl + 'QueryProjectInfoBridgeUnit', data)
  },

  // 上传子单位工程
  uploadProjectInfoBridgeProject(data) {
    return postRequest(baseUrl + 'UploadProjectInfoBridgeProject', data)
  },
  // 修改子单位工程
  updateProjectInfoBridgeProject(data) {
    return postRequest(baseUrl + 'UpdateProjectInfoBridgeProject', data)
  },
  // 查询子单位工程
  queryProjectInfoBridgeProject(data) {
    return postRequest(baseUrl + 'QueryProjectInfoBridgeProject', data)
  },
  // 删除子单位工程
  delProjectInfoBridgeProject(data) {
    return postRequest(baseUrl + 'DelProjectInfoBridgeProject', data)
  },
  // 上传映射表
  exportProjectInfoBridgeComponentJson(data) {
    return postRequest(baseUrl + 'ExportProjectInfoBridgeComponentJson', data)
  },
  // 获取子单位工程构件信息
  queryProjectInfoBridgeComponentGroup(data) {
    return postRequest(baseUrl + 'QueryProjectInfoBridgeComponentGroup', data)
  },
  // 分部分项明细
  queryProjectInfoProjectItem(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectItem', data)
  },

  /*********************资源共享***********************/
  // 查询资源共享
  queryProjectInfoProjectDoc(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectDoc', data)
  },
  // 删除资源共享
  delProjectInfoProjectDoc(data) {
    return postRequest(baseUrl + 'DelProjectInfoProjectDoc', data)
  },
  // 修改资源共享
  updateProjectInfoProjectDoc(data) {
    return postRequest(baseUrl + 'UpdateProjectInfoProjectDoc', data)
  },
  // 新增资源共享
  uploadProjectInfoProjectDoc(data) {
    return postRequest(baseUrl + 'UploadProjectInfoProjectDoc', data)
  },
  /*********************项目动态***********************/
  // 查询项目动态
  queryArticleNews(data) {
    return postRequest(baseUrl + 'QueryArticleNews', data)
  },
  // 删除项目动态
  delArticleNews(data) {
    return postRequest(baseUrl + 'DelArticleNews', data)
  },
  // 修改项目动态
  updateArticleNews(data) {
    return postRequest(baseUrl + 'UpdateArticleNews', data)
  },
  // 上传项目动态
  uploadArticleNews(data) {
    return postRequest(baseUrl + 'UploadArticleNews', data)
  },

  /*********************劳务班组***********************/
  // 查询单位公司
  queryProjectInfoServiceCompany(data) {
    return postRequest(baseUrl + 'QueryProjectInfoServiceCompany', data)
  },
  // 删除单位公司
  delProjectInfoServiceCompany(data) {
    return postRequest(baseUrl + 'DelProjectInfoServiceCompany', data)
  },
  // 修改单位公司
  updateProjectInfoServiceCompany(data) {
    return postRequest(baseUrl + 'UpdateProjectInfoServiceCompany', data)
  },
  // 上传单位公司
  uploadProjectInfoServiceCompany(data) {
    return postRequest(baseUrl + 'UploadProjectInfoServiceCompany', data)
  },
  /*********************信用评定***********************/
  //查询信用评定
  queryProjectInfoServiceCompanyGrade(data) {
    return postRequest(baseUrl + 'QueryProjectInfoServiceCompanyGrade', data)
  },
  //删除信用评定
  delProjectInfoServiceCompanyGrade(data) {
    return postRequest(baseUrl + 'DelProjectInfoServiceCompanyGrade', data)
  },
  //上传信用评定
  uploadProjectInfoServiceCompanyGrade(data) {
    return postRequest(baseUrl + 'UploadProjectInfoServiceCompanyGrade', data)
  },
  /*********************路基***********************/
  uploadPartialItemRoadBase(data) {
    return postRequest(baseUrl + "UploadPartialItemRoadBase", data);
  },
  updatePartialItemRoadBase(data) {
    return postRequest(baseUrl + "UpdatePartialItemRoadBase", data);
  },
  delPartialItemRoadBase(data) {
    return postRequest(baseUrl + "DelPartialItemRoadBase", data);
  },
  queryPartialItemRoadBase(data) {
    return postRequest(baseUrl + "QueryPartialItemRoadBase", data);
  }
}
