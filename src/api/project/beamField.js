import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=',
  end = '_G360WC';

export default {
  uploadWisdomBeamBeamField(data) {
    return postRequest(baseUrl + 'UploadWisdomBeamBeamField' + end, data);
  },
  updateWisdomBeamBeamField(data) {
    return postRequest(baseUrl + 'UpdateWisdomBeamBeamField' + end, data);
  },
  queryWisdomBeamBeamField(data) {
    return postRequest(baseUrl + 'QueryWisdomBeamBeamField' + end, data);
  },
  delWisdomBeamBeamField(data) {
    return postRequest(baseUrl + 'DelWisdomBeamBeamField' + end, data);
  },
  // 查询梁片数量统计
  queryWisdomBeamBeamFieldSummary(data) {
    return postRequest(baseUrl + 'QueryWisdomBeamBeamFieldSummary' + end, data);
  },
  // 查询梁场生产统计
  queryWisdomBeamFieldPieceStat(data) {
    return postRequest(baseUrl + 'QueryWisdomBeamFieldPieceStat' + end, data);
  },
  // 查询梁场梁片信息
  queryWisdomBeamPieceInfo(data) {
    return postRequest(baseUrl + 'QueryWisdomBeamPieceInfo' + end, data);
  },
  queryWisdomBeamDailyProgressInfo(data) {
    return postRequest(baseUrl + 'QueryWisdomBeamDailyProgressInfo' + end, data);
  },
  queryWisdomBeamFieldPieceStat(data) {
    return postRequest(baseUrl + 'QueryWisdomBeamFieldPieceStat' + end, data);
  },
  queryWisdomBeamPlanAndProgStat(data) {
    return postRequest(baseUrl + 'QueryWisdomBeamPlanAndProgStat' + end, data);
  },
  updateWisdomBeamDailyProgressInfo(data) {
    return postRequest(baseUrl + 'UpdateWisdomBeamDailyProgressInfo' + end, data);
  }
};
