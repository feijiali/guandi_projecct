import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 方案配置
export default {
  // 上传关联类型
  UploadProjectLibraryTagUnion(data) {
    return postRequest(baseUrl + "UploadProjectLibraryTagUnion", data);
  },
  // 编辑关联类型
  UpdateProjectLibraryTagUnion(data) {
    return postRequest(baseUrl + "UpdateProjectLibraryTagUnion", data);
  },
  // 查询编辑类型
  QueryProjectLibraryTagUnion(data) {
    return postRequest(baseUrl + "QueryProjectLibraryTagUnion", data);
  },
  // 查询编辑类型列表
  QueryProjectLibraryTagUnionList(data) {
    return postRequest(baseUrl + "QueryProjectLibraryTagUnionList", data);
  },
  //查询方案
  QueryProjectPlanList(data) {
    return postRequest(baseUrl + "QueryProjectLibraryTagUnionList", data);
  },
  //上传关联方案
  UploadProjectLibraryPlanUnion(data) {
    return postRequest(baseUrl + "UploadProjectLibraryPlanUnion", data);
  },
  //编辑关联方案
  UpdateProjectLibraryPlanUnion(data) {
    return postRequest(baseUrl + "UpdateProjectLibraryPlanUnion", data);
  },
  //删除关联方案
  DelProjectLibraryPlanUnion(data) {
    return postRequest(baseUrl + "DelProjectLibraryPlanUnion", data);
  },
  //查询关联方案列表
  QueryProjectLibraryPlanUnionList(data) {
    return postRequest(baseUrl + "QueryProjectLibraryPlanUnionList", data);
  },
  //查询关联方案
  QueryProjectLibraryPlanUnion(data) {
    return postRequest(baseUrl + "QueryProjectLibraryPlanUnion", data);
  },
  //上传项目方案分类树
  UploadProjectPlanCategoryTree(data) {
    return postRequest(baseUrl + "UploadProjectPlanCategoryTree", data);
  },
  //查询项目方案分类树
  QueryProjectPlanCategoryTree(data) {
    return postRequest(baseUrl + "QueryProjectPlanCategoryTree", data);
  },
  //查询项目方案分类
  QueryProjectPlanCategory(data) {
    return postRequest(baseUrl + "QueryProjectPlanCategory", data);
  },
  //上传BIM建筑物
  UploadProjectLibraryBimStructure(data) {
    return postRequest(baseUrl + "UploadProjectLibraryBimStructure", data);
  },
  //编辑BIM建筑物
  UpdateProjectLibraryBimStructure(data) {
    return postRequest(baseUrl + "UpdateProjectLibraryBimStructure", data);
  },
  //删除BIM建筑物
  DelProjectLibraryBimStructure(data) {
    return postRequest(baseUrl + "DelProjectLibraryBimStructure", data);
  },
  //查询BIM建筑物
  QueryProjectLibraryBimStructureList(data) {
    return postRequest(baseUrl + "QueryProjectLibraryBimStructureList", data);
  },
  //查询分类(树形结构)-结合方案库和方案配置
  QueryProjectPlanCategoryTreeUnion(data) {
    return postRequest(baseUrl + "QueryProjectPlanCategoryTreeUnion", data);
  },
};
