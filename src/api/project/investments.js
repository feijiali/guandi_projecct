import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

export default {
  queryChangeManageChangeStat(data) {
    return postRequest(baseUrl + 'QueryChangeManageChangeStat', data);
  },
  queryChangeManageChangeOrganStat(data) {
    return postRequest(baseUrl + 'QueryChangeManageChangeOrganStat', data);
  },
  queryChangeManageChangeType(data) {
    return postRequest(baseUrl + 'QueryChangeManageChangeType', data);
  },
  queryChangeManageFileType(data) {
    return postRequest(baseUrl + 'QueryChangeManageFileType', data);
  },

  // 上传变更台账
  uploadChangeManageChangeHistory(data) {
    return postRequest(baseUrl + 'UploadChangeManageChangeHistory', data);
  },
  // 修改变更台账
  updateChangeManageChangeHistory(data) {
    return postRequest(baseUrl + 'UpdateChangeManageChangeHistory', data);
  },
  // 删除变更台账
  delChangeManageChangeHistory(data) {
    return postRequest(baseUrl + 'DelChangeManageChangeHistory', data);
  },
  // 查询变更台账
  queryChangeManageChangeHistory(data) {
    return postRequest(baseUrl + 'QueryChangeManageChangeHistory', data);
  }
};
