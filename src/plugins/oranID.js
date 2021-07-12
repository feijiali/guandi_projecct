/*
 * @Autor: 邓易
 * @Date: 2020-11-09 09:30:56
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-02 15:43:02
 */
export const $organ_id_en_or_pro = function (that, obj) {
  // return that.$route.fullPath.includes("enterprise") ? that.$store.getters.rootOrganID : that.$store.getters.organID;
  return that.$route.fullPath.includes("enterprise") ? that.$store.getters.account_project_ids : that.$store.getters.organID;
};
