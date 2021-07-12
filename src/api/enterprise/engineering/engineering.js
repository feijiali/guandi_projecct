import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

// 工程管理
export default {
  // 上传项目基本信息
  uploadProjectInfoProject(data) {
    return postRequest(baseUrl + 'UploadProjectInfoProject', data);
  },
  // 修改项目基本信息
  updateProjectInfoProject(data) {
    return postRequest(baseUrl + 'UpdateProjectInfoProject', data);
  },
  // 删除项目基本信息
  delProjectInfoProject(data) {
    return postRequest(baseUrl + 'DelProjectInfoProject', data);
  },
  // 查询项目基本信息
  queryProjectInfoProject(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProject', data);
  },
  // 查询项目-统计
  queryProjectInfoProjectSummary(data) {
    return postRequest(baseUrl + 'QueryProjectInfoProjectSummary', data);
  },
  ExportProjectInfoProject(data) {
    return postRequest(baseUrl + 'ExportProjectInfoProject', data);
  }
};
