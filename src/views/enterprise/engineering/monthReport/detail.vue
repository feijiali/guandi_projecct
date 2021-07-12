<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill pl-2 pr-2">
      <n-scroll>
        <span
          class="font-20 font-weight-bold mb-1 d-block border-bottom pb-2 mt-2"
          >{{ infoList.linkage_project_name }}</span
        >
        <div class="border-bottom pb-2 mb-1">
          <div class="flexsta">
            <span class="font-20 font-weight-bold mb-1 d-block"
              >商务管理中心</span
            >
            <n-button
              v-if="
                contractArr.length &&
                contractArr[0].linkage_approve_account_id_un ==
                  Number(this.$store.getters.account_id) &&
                contractArr[0].linkage_approve_state == 0
              "
              class="mb-1 ml-2"
              :btnText="'去审批'"
              :width="'102px'"
              :colorBtn="'blue'"
              @buttonClick="
                $router.linkTo(
                  'enterprise_engineering_monthReport_prjApproval',
                  {
                    id: project_linkage_id,
                    type: contractArr[0].linkage_approve_type,
                    linkageid: contractArr[0].linkage_approve_id,
                  }
                )
              "
            ></n-button>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    contractArr[0].linkage_approve_remark
                      ? contractArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="contractArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                src="@/assets/images/enterprise/icon_process_detail_agree.png"
                v-if="
                  contractArr.length &&
                  contractArr[0].linkage_approve_state == 2
                "
                slot="reference"
              />
            </el-popover>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    contractArr[0].linkage_approve_remark
                      ? contractArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="contractArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_refuse.png"
                v-if="
                  contractArr.length &&
                  contractArr[0].linkage_approve_state == 1
                "
              />
            </el-popover>
          </div>
          <div>
            <span class="grey2">审批人：</span>{{ contractArr[0].account_name }}
          </div>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                签订日期：<span class="text-hover-dark">{{
                  infoList.project_linkage_sign_date
                }}</span>
              </p>
              <p class="mt-1 grey2">
                工程所在地：<span class="text-hover-dark">{{
                  infoList.project_linkage_address
                }}</span>
              </p>
              <p class="mt-1 grey2">
                经营专员：<span class="text-hover-dark">{{
                  infoList.project_linkage_commissioner
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合同约定完工比例（%）：<span class="text-hover-dark">{{
                  infoList.project_linkage_contracted_per
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                合同编号：<span class="text-hover-dark">{{
                  infoList.project_linkage_sign_no
                }}</span>
              </p>
              <p class="mt-1 grey2">
                工程质量要求：<span class="text-hover-dark">{{
                  infoList.project_linkage_quality
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合同总金额（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_total_money
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合同开工时间：<span class="text-hover-dark">{{
                  infoList.project_linkage_contract_date
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                总包/分包：<span class="text-hover-dark">{{
                  ["", "总包", "分包"][infoList.project_linkage_type]
                }}</span>
              </p>
              <p class="mt-1 grey2">
                项目负责人员：<span class="text-hover-dark">{{
                  infoList.project_linkage_charge_account
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合同约定预付款（%）：<span class="text-hover-dark">{{
                  infoList.project_linkage_contract_per
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合同完工时间：<span class="text-hover-dark">{{
                  infoList.project_linkage_contract_finish_date
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                发包单位：<span class="text-hover-dark">{{
                  infoList.project_linkage_unit
                }}</span>
              </p>
              <p class="mt-1 grey2">
                项目经办人员：<span class="text-hover-dark">{{
                  infoList.project_linkage_handling_account
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合同约定进度比例（%）：<span class="text-hover-dark">{{
                  infoList.project_linkage_contracting_per
                }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="border-bottom pb-2 mb-1">
          <div class="flexsta">
            <span class="font-20 font-weight-bold mb-1 d-block"
              >工程管理中心</span
            >
            <n-button
              v-if="
                projectArr.length &&
                projectArr[0].linkage_approve_account_id_un ==
                  Number(this.$store.getters.account_id) &&
                projectArr[0].linkage_approve_state == 0
              "
              class="mb-1 ml-2"
              :btnText="'去审批'"
              :width="'102px'"
              :colorBtn="'blue'"
              @buttonClick="
                $router.linkTo(
                  'enterprise_engineering_monthReport_prjApproval',
                  {
                    id: project_linkage_id,
                    type: projectArr[0].linkage_approve_type,
                    linkageid: projectArr[0].linkage_approve_id,
                  }
                )
              "
            ></n-button>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    projectArr[0].linkage_approve_remark
                      ? projectArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="projectArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_agree.png"
                v-if="
                  projectArr.length && projectArr[0].linkage_approve_state == 2
                "
              />
            </el-popover>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    projectArr[0].linkage_approve_remark
                      ? projectArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="projectArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_refuse.png"
                v-if="
                  projectArr.length && projectArr[0].linkage_approve_state == 1
                "
              />
            </el-popover>
          </div>
          <div>
            <span class="grey2">审批人：</span>{{ projectArr[0].account_name }}
          </div>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                实际开工时间：<span class="text-hover-dark">{{
                  infoList.project_linkage_operation_date
                }}</span>
              </p>
              <p class="mt-1 grey2">
                业主季度评价：<span class="text-hover-dark">{{
                  ["", "非常满意", "满意", "一般", "差"][
                    infoList.project_linkage_people_evaluate
                  ]
                }}</span>
              </p>
              <p class="mt-1 grey2">
                累计审批完成产值（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_total_approve_money
                }}</span>
              </p>
              <p class="mt-1 grey2">
                工程款累计应收（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_total_worth
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                实际完工时间：<span class="text-hover-dark">{{
                  infoList.project_linkage_operation_end_date
                }}</span>
              </p>
              <p class="mt-1 grey2">
                截至{{ lastyear }}年12月累计审批完成产值（万元）：<span
                  class="text-hover-dark"
                  >{{ infoList.project_linkage_approve_money }}</span
                >
              </p>
              <p class="mt-1 grey2">
                未确认产值（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_unconfirmed_worth
                }}</span>
              </p>
              <p class="mt-1 grey2">
                工程款累计已收（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_total_worthed
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                项目状态：<span class="text-hover-dark">{{
                  ["", "完工", "在建"][infoList.project_linkage_project_state]
                }}</span>
              </p>
              <p class="mt-1 grey2">
                本月审批完成产值（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_approve_money
                }}</span>
              </p>
              <p class="mt-1 grey2">
                工程款当月应收（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_worth
                }}</span>
              </p>
              <p class="mt-1 grey2">
                工程款累计应收未收（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_worth
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                监理季度评价：<span class="text-hover-dark">{{
                  ["", "非常满意", "满意", "一般", "差"][
                    infoList.project_linkage_evaluate
                  ]
                }}</span>
              </p>
              <p class="mt-1 grey2">
                {{ thisyear }}年度审批完成产值（万元）：<span
                  class="text-hover-dark"
                  >{{ infoList.project_linkage_year_approve_money }}</span
                >
              </p>
              <p class="mt-1 grey2">
                工程款当月已收（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_worthed
                }}</span>
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <div class="d-flex flex-column w-25 mr-1">
              <span class="font-20 font-weight-bold d-block grey2"
                >本月申请支付金额</span
              >
              <p class="mt-1 grey2">
                劳务、专业分包（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_pay
                }}</span>
              </p>
              <p class="mt-1 grey2">
                材料——主材（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_material_pay
                }}</span>
              </p>
              <p class="mt-1 grey2">
                材料——辅材（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_materials_pay
                }}</span>
              </p>
              <p class="mt-1 grey2">
                机械（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_equip_pay
                }}</span>
              </p>
              <p class="mt-1 grey2">
                其他（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_other_pay
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合计（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_month_total_pay
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 border-left pl-2">
              <span class="font-20 font-weight-bold d-block grey2"
                >累计申请支付金额</span
              >
              <p class="mt-1 grey2">
                劳务、专业分包（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_payed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                材料——主材（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_material_payed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                材料——辅材（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_materials_payed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                机械（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_equip_payed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                其他（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_other_payed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合计（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_total_payed
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 border-left pl-2">
              <span class="font-20 font-weight-bold d-block grey2"
                >应付未付支付金额</span
              >
              <p class="mt-1 grey2">
                劳务、专业分包（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_paying
                }}</span>
              </p>
              <p class="mt-1 grey2">
                材料——主材（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_material_paying
                }}</span>
              </p>
              <p class="mt-1 grey2">
                材料——辅材（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_materials_paying
                }}</span>
              </p>
              <p class="mt-1 grey2">
                机械（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_equip_paying
                }}</span>
              </p>
              <p class="mt-1 grey2">
                其他（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_other_paying
                }}</span>
              </p>
              <p class="mt-1 grey2">
                保留金等暂扣款：<span class="text-hover-dark">{{
                  infoList.project_linkage_withhold_paying
                }}</span>
              </p>
              <p class="mt-1 grey2">
                合计（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_total_paying
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1"></div>
          </div>
        </div>

        <div class="border-bottom pb-2 mb-1">
          <div class="flexsta">
            <span class="font-20 font-weight-bold mb-1 d-block"
              >财务管理中心</span
            >
            <n-button
              v-if="
                financeArr.length &&
                financeArr[0].linkage_approve_account_id_un ==
                  Number(this.$store.getters.account_id) &&
                financeArr[0].linkage_approve_state == 0
              "
              class="mb-1 ml-2"
              :btnText="'去审批'"
              :width="'102px'"
              :colorBtn="'blue'"
              @buttonClick="
                $router.linkTo(
                  'enterprise_engineering_monthReport_prjApproval',
                  {
                    id: project_linkage_id,
                    type: financeArr[0].linkage_approve_type,
                    linkageid: financeArr[0].linkage_approve_id,
                  }
                )
              "
            ></n-button>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    financeArr[0].linkage_approve_remark
                      ? financeArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="financeArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_agree.png"
                v-if="
                  financeArr.length && financeArr[0].linkage_approve_state == 2
                "
              />
            </el-popover>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    financeArr[0].linkage_approve_remark != ""
                      ? financeArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="financeArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_refuse.png"
                v-if="
                  financeArr.length && financeArr[0].linkage_approve_state == 1
                "
              />
            </el-popover>
          </div>
          <div>
            <span class="grey2">审批人：</span>{{ financeArr[0].account_name }}
          </div>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                累计开发票金额（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_billing
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                借款余额（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_loan
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1"></div>
            <div class="d-flex flex-column w-25 mr-1"></div>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <div class="d-flex flex-column w-25 mr-1">
              <span class="font-20 font-weight-bold d-block grey2"
                >累计应交（应扣）费用</span
              >
              <p class="mt-1 grey2">
                税费（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_taxed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                管理费（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_managed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                其他指标款（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_othered
                }}</span>
              </p>
              <p class="mt-1 grey2">
                风险保证金和保函保证金（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_moneyed
                }}</span>
              </p>
              <p class="mt-1 grey2">
                小计（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_totaled
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 border-left pl-2">
              <span class="font-20 font-weight-bold d-block grey2"
                >累计应交未交（应扣未扣）费用</span
              >
              <p class="mt-1 grey2">
                税费（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_tax
                }}</span>
              </p>
              <p class="mt-1 grey2">
                管理费（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_manage
                }}</span>
              </p>
              <p class="mt-1 grey2">
                其他指标款（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_other
                }}</span>
              </p>
              <p class="mt-1 grey2">
                风险保证金和保函保证金（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_money
                }}</span>
              </p>
              <p class="mt-1 grey2">
                小计（万元）：<span class="text-hover-dark">{{
                  infoList.project_linkage_finance_total
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1"></div>
            <div class="d-flex flex-column w-25 mr-1"></div>
          </div>
        </div>

        <div class="border-bottom pb-2 mb-1">
          <div class="flexsta">
            <span class="font-20 font-weight-bold mb-1 d-block"
              >质量安全管理中心</span
            >
            <n-button
              v-if="
                riskArr.length &&
                riskArr[0].linkage_approve_account_id_un ==
                  Number(this.$store.getters.account_id) &&
                riskArr[0].linkage_approve_state == 0
              "
              class="mb-1 ml-2"
              :btnText="'去审批'"
              :width="'102px'"
              :colorBtn="'blue'"
              @buttonClick="
                $router.linkTo(
                  'enterprise_engineering_monthReport_prjApproval',
                  {
                    id: project_linkage_id,
                    type: riskArr[0].linkage_approve_type,
                    linkageid: riskArr[0].linkage_approve_id,
                  }
                )
              "
            ></n-button>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    riskArr[0].linkage_approve_remark != ""
                      ? riskArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="riskArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_agree.png"
                v-if="riskArr.length && riskArr[0].linkage_approve_state == 2"
              />
            </el-popover>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    riskArr[0].linkage_approve_remark != ""
                      ? riskArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="riskArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_refuse.png"
                v-if="riskArr.length && riskArr[0].linkage_approve_state == 1"
              />
            </el-popover>
          </div>
          <div>
            <span class="grey2">审批人：</span>{{ riskArr[0].account_name }}
          </div>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                质量评价（优、良、合格、差）：<span class="text-hover-dark">{{
                  ["", "优", "良", "合格", "差"][
                    infoList.project_linkage_quality_level
                  ]
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                安全评价（优、良、合格、差）：<span class="text-hover-dark">{{
                  ["", "优", "良", "合格", "差"][
                    infoList.project_linkage_security_level
                  ]
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                创优计划（有/无）：<span class="text-hover-dark">{{
                  ["", "有", "无"][infoList.project_linkage_excellence]
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1"></div>
          </div>
        </div>

        <div class="border-bottom pb-2 mb-1">
          <div class="flexsta">
            <span class="font-20 font-weight-bold mb-1 d-block"
              >风控管理中心</span
            >
            <n-button
              v-if="
                securityArr.length &&
                securityArr[0].linkage_approve_account_id_un ==
                  Number(this.$store.getters.account_id) &&
                securityArr[0].linkage_approve_state == 0
              "
              class="mb-1 ml-2"
              :btnText="'去审批'"
              :width="'102px'"
              :colorBtn="'blue'"
              @buttonClick="
                $router.linkTo(
                  'enterprise_engineering_monthReport_prjApproval',
                  {
                    id: project_linkage_id,
                    type: securityArr[0].linkage_approve_type,
                    linkageid: securityArr[0].linkage_approve_id,
                  }
                )
              "
            ></n-button>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    securityArr[0].linkage_approve_remark != ""
                      ? securityArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="securityArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_agree.png"
                v-if="
                  securityArr.length &&
                  securityArr[0].linkage_approve_state == 2
                "
              />
            </el-popover>
            <el-popover placement="right" width="200" trigger="hover">
              <div class="p-1">
                <div>
                  审批意见：{{
                    securityArr[0].linkage_approve_remark != ""
                      ? securityArr[0].linkage_approve_remark
                      : "暂无"
                  }}
                </div>
                <div class="d-inline-flex mt-1">
                  电子签名：<img
                    class="autograph"
                    :src="securityArr[0].linkage_approve_pic"
                  />
                </div>
              </div>
              <img
                class="mb-1 ml-2"
                slot="reference"
                src="@/assets/images/enterprise/icon_process_detail_refuse.png"
                v-if="
                  securityArr.length &&
                  securityArr[0].linkage_approve_state == 1
                "
              />
            </el-popover>
          </div>
          <div>
            <span class="grey2">审批人：</span>{{ securityArr[0].account_name }}
          </div>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                案件累计发生数量（个）：<span class="text-hover-dark">{{
                  infoList.project_risk_num
                }}</span>
              </p>
              <p class="mt-1 grey2">
                投诉金额（万元）：<span class="text-hover-dark">{{
                  infoList.project_risk_litigation_money
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1 pl-2">
              <p class="mt-1 grey2">
                案件累计诉讼金额（万元）：<span class="text-hover-dark">{{
                  infoList.project_risk_money
                }}</span>
              </p>
              <p class="mt-1 grey2">
                投诉内容：<span class="text-hover-dark">{{
                  infoList.project_risk_complaint
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                案件当月发生数量（个）：<span class="text-hover-dark">{{
                  infoList.project_risk_month_num
                }}</span>
              </p>
              <p class="mt-1 grey2">
                处理情况：<span class="text-hover-dark">{{
                  infoList.project_risk_dispose
                }}</span>
              </p>
            </div>
            <div class="d-flex flex-column w-25 mr-1">
              <p class="mt-1 grey2">
                案件当月诉讼金额（万元）：<span class="text-hover-dark">{{
                  infoList.project_risk_month_money
                }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="border-bottom pb-2 mb-1">
          <span class="font-20 font-weight-bold mb-1 d-block">备注</span>
          <p class="mt-1">{{ infoList.project_linkage_remark }}</p>
        </div>
      </n-scroll>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
export default {
  mixins: [confirm],
  data() {
    return {
      title: "项目管理联动与报表详情",
      project_linkage_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑人员的id
      infoList: {
        approve_info: [],
      },
      contractArr: [], //商务审批人员
      projectArr: [], //工程审批人员
      financeArr: [], //财务审批人员
      riskArr: [], //质量审批人员
      securityArr: [], //风控审批人员
      lastyear: "",
      thisyear: "",
    };
  },
  async created() {
    this.project_linkage_id && (await this.queryProjectInfoProjectLinkage());
  },
  methods: {
    // 编辑
    async queryProjectInfoProjectLinkage() {
      let data = await api.queryProjectInfoProjectLinkage({
        project_linkage_id: this.project_linkage_id,
      });
      this.infoList = data.result[0];
      if (this.infoList.risk_info != null) {
        this.infoList = { ...this.infoList, ...this.infoList.risk_info[0] };
      }
      this.lastyear = this.infoList.linkage_project_date.split("-")[0] - 1;
      this.thisyear = this.infoList.linkage_project_date.split("-")[0];
      let contractArr = [];
      let projectArr = [];
      let financeArr = [];
      let riskArr = [];
      let securityArr = [];
      for (let i = 0; i < this.infoList.approve_info.length; i++) {
        if (this.infoList.approve_info[i].linkage_approve_type == 1) {
          contractArr.push(this.infoList.approve_info[i]);
        }
        if (this.infoList.approve_info[i].linkage_approve_type == 2) {
          projectArr.push(this.infoList.approve_info[i]);
        }
        if (this.infoList.approve_info[i].linkage_approve_type == 3) {
          financeArr.push(this.infoList.approve_info[i]);
        }
        if (this.infoList.approve_info[i].linkage_approve_type == 4) {
          riskArr.push(this.infoList.approve_info[i]);
        }
        if (this.infoList.approve_info[i].linkage_approve_type == 5) {
          securityArr.push(this.infoList.approve_info[i]);
        }
      }
      this.$nextTick(() => {
        this.contractArr = contractArr;
        this.projectArr = projectArr;
        this.financeArr = financeArr;
        this.riskArr = riskArr;
        this.securityArr = securityArr;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.w-80 {
  width: 79%;
}
.el-button--small.is-circle {
  padding: 5px;
}
.person-list {
  padding: 10px 0;
}
.person-list-item {
  padding: 5px 10px;
}
.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #5a5efd;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}
.el-button--info,
.el-button--info:focus,
.el-button--info:hover {
  background-color: #8a8ba6;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    font-weight: 900;
  }
}

.shift-setting-item {
  min-height: 200px;
  width: 50%;
  background-color: #f7f7ff;
  border-radius: 10px;
  .shift-setting-item-left {
    background-color: #f7f7ff;
  }
  .shift-setting-item-right {
    background-color: #eaebff;
    padding: 14px;
  }
  .shift-setting-item-left-title {
    background-color: #eaebff;
    width: 40px;
    letter-spacing: 6px;
    text-align: center;
    color: $main;
    line-height: 24px;
    font-size: 16px;
    border-radius: 10px 0 0 10px;
  }
}
.label-l {
  width: 100px;
  text-align: right;
}
.autograph {
  height: 20px;
  width: 40px;
}
</style>
