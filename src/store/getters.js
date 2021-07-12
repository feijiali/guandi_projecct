/*
 * @Author: 郭海林
 * @Date: 2020-06-04 11:37:07
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-01 15:01:59
 * @FilePath: \中铁18局\src\store\getters.js
 */
import VueRouter from "vue-router";

const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  account_tel: state => state.user.account_tel,
  account_id_card: state => state.user.account_id_card,
  account_sex: state => state.user.account_sex,
  account_range_type: state => state.user.account_range_type,
  account_job: state => state.user.account_job,
  account_sign: state => state.user.account_sign,
  account_sign_name: state => state.user.account_sign_name,
  account_character_type: state => state.user.account_character_type,
  account_range_type: state => state.user.account_range_type,
  avatar: state => state.user.avatar,
  account_id: state => state.user.account_id,
  user_project: state => state.user.user_project,
  user_enterprise: state => state.user.user_enterprise,
  account_password_is_default: state => state.user.account_password_is_default,
  roles: state => state.user.roles,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  permissionList: state => state.user.permissionList,
  organTreeData: state => state.app.organTreeData,
  subject: state => state.app.subject,
  subject_label: state => state.app.subject_label,
  subject_list: state => state.app.subject_list,
  organID: state => state.app.organID,
  organ_rns_id: state => state.app.organ_rns_id,
  organProject: state => state.app.organProject,
  projectId: state => state.app.projectId,
  projectName: state => state.app.projectName,
  projectLogoUrl: state => state.app.projectLogoUrl,
  project_classify: state => state.app.project_classify,
  organType: state => state.app.organType,
  rootOrganID: state => state.app.rootOrganID,
  rootOrganName: state => state.app.rootOrganName,
  staff_status: state => state.user.staff_status,
  menuData: state => state.permission.menuData,
  submenuData: state => state.permission.subMenuData,
  isNoRead: state => state.app.isNoRead,
  statement_info: state => state.app.statement_info,
  out_bound_info: state => state.app.out_bound_info,
  // list_managr_orgin: state => state.app.list_managr_orgin,
  user_organ_id: state => state.user.user_organ_id,
  user_organ_name: state => state.user.user_organ_name,
  account_project_ids: state => state.user.account_project_ids,
  organ_child_node: state => state.user.organ_child_node,
  deployplan_node: state => state.deployplan.deployplan_node,
  deployplan_type: state => state.deployplan.deployplan_type,
  planInfo_node: state => state.planInfo.planInfo_node,
  planInfo_type: state => state.planInfo.planInfo_type,
  bim_select_organ: state => state.app.bim_select_organ,


  // userProject.js的state数据
  organProjectAccount: state => state.userProject.organProjectAccount,
  organTreeDataAccount: state => state.userProject.organTreeDataAccount,
  subjectAccount: state => state.userProject.subjectAccount,
  subject_listAccount: state => state.userProject.subject_listAccount,
};
export default getters;
