import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 仓库管理
export default {
  // 查询入库单
  QueryWarehouseStorage(data) {
    return postRequest(baseUrl + "QueryWarehouseStorage", data);
  },
  // 查询入库单(列表)
  QueryWarehouseStorageList(data) {
    return postRequest(baseUrl + "QueryWarehouseStorageList", data);
  },
  // 删除入库单
  DelWarehouseStorage(data) {
    return postRequest(baseUrl + "DelWarehouseStorage", data);
  },

  
   // 查询仓库
   QueryWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "QueryWarehouseManageStoreroom", data);
  },
   // 删除仓库
   DelWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "DelWarehouseManageStoreroom", data);
  },
   // 启用停止仓库
   StartWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "StartWarehouseManageStoreroom", data);
  },
   // 修改仓库
   UpdateWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "UpdateWarehouseManageStoreroom", data);
  },
   // 上传仓库
   UploadWarehouseManageStoreroom(data) {
    return postRequest(baseUrl + "UploadWarehouseManageStoreroom", data);
  },
};
