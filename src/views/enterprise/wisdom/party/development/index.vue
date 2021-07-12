<template>
  <div class="w-100 h-100 d-flex flex-column rounded-1 bg-white">
    <div class="top-select-box">
      <div>
        <div class="d-inline-block">
          <label class="text-secondary">所属机构：</label>
          <n-treeselect
            ref="treeselect"
            @getSelectNode="getSelectValue"
            :treeData="treeData"
            :Isvalue="true"
            v-model="listQuery.organ_node"
          />
        </div>
      </div>
    </div>
    <div class="flex-fill p-2">
      <n-scroll>
        <div
          class="p-inf-main text-center clear"
          style="top: 80px; bottom: 20px; overflow-y: auto"
        >
          <div class="part-main-div position-relative clear">
            <div class="part-item-main lt">
              <div
                class="part-title choose part-title-top cursor-p"
                @click="
                  linkTo('enterprise_oa_party', {
                    t: 10,
                    auth: 'UnionPartyPersonnelDevelop',
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_process_arrow.png"
                  class="d-inline-block arrows"
                />
                <div class="count-span">
                  递交入党申请书
                  <p>（{{ countArr["1"] }}人）</p>
                </div>
              </div>
            </div>
          </div>
          <div class="part-main-div position-relative">
            <div class="part-item-main lt">
              <div :class="['part-title', 'choose', 'part-title-top']">
                党支部<img
                  src="@/assets/images/enterprise/icon_process_arrow.png"
                  class="d-inline-block arrows"
                />
              </div>

              <div class="part-title cursor-p part-process">
                <span></span
                ><img
                  src="@/assets/images/enterprise/icon_process_selected.png"
                  class="vertical-top d-inline-block"
                  style="width: 20px"
                />
                <p class="d-inline-block">
                  (15天内)组织谈话<br />指定联系人1-2人
                </p>
              </div>
              <div class="part-title cursor-p part-process">
                <span></span
                ><img
                  src="@/assets/images/enterprise/icon_process_selected.png"
                  class="vertical-top d-inline-block"
                  style="width: 20px"
                />
                <p class="d-inline-block">报党委备案</p>
              </div>
            </div>
          </div>
          <div class="part-main-div position-relative">
            <div class="part-item-main lt">
              <div
                :class="['part-title', 'choose', 'part-title-top', 'cursor-p']"
                @click="
                  linkTo('enterprise_wisdom_party_development_activistList', {
                    range: '2,4',
                    type: 2,
                    organ_id: listQuery.organ_node,
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_process_arrow.png"
                  class="d-inline-block arrows"
                />
                <div class="count-span">
                  确定入党积极分子
                  <p>（{{ countArr["2"] }}人）</p>
                </div>
              </div>

              <div class="part-title">
                <span></span>
                <p class="mgb7 grey2 mb-1">必备材料：</p>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    1.报院党委备案
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    2.填写积极分子考察表
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    3.个人自转材料
                  </p>
                </div>
              </div>
              <div class="part-title cursor-p part-process">
                <span></span
                ><img
                  src="@/assets/images/enterprise/icon_process_selected.png"
                  class="vertical-top d-inline-block"
                  style="width: 20px"
                />
                <p class="d-inline-block">支部大会讨论通过</p>
              </div>
            </div>
          </div>
          <div class="part-main-div position-relative">
            <div class="part-item-main lt">
              <div
                :class="['part-title', 'choose', 'part-title-top', 'cursor-p']"
                @click="
                  linkTo(
                    'enterprise_wisdom_party_development_activistList_add',
                    { organ_id: listQuery.organ_node }
                  )
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_process_arrow.png"
                  class="d-inline-block arrows"
                />
                <div class="count-span">确定发展对象</div>
                <span></span>
              </div>

              <div class="part-title cursor-p part-process">
                <span></span
                ><img
                  src="@/assets/images/enterprise/icon_process_selected.png"
                  class="vertical-top d-inline-block"
                  style="width: 20px"
                />
                <p class="d-inline-block">
                  积极分子考察满一年，具备预备党员审查后，确定入党介绍人，支部大会审议通过
                </p>
              </div>
            </div>
          </div>
          <div class="part-main-div position-relative">
            <div class="part-item-main lt">
              <div
                :class="['part-title', 'cursor-p', 'choose', 'part-title-top']"
                @click="
                  linkTo('enterprise_wisdom_party_development_prepartList', {
                    range: '5,6',
                    type: 3,
                    organ_id: listQuery.organ_node,
                  })
                "
              >
                <div class="count-span">
                  接收预备党员
                  <p>（{{ countArr["3"] }}人）</p>
                </div>
              </div>
              <div class="part-title">
                <span></span>
                <p class="mgb7 grey2 mb-1">必备材料：</p>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    1.积极分子考察表
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    2.个人思想汇报
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">3.政审</p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    4.党课学习证明
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    5.入党志愿书
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    6.党内外群众意见
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    7.支委会决议
                  </p>
                </div>
              </div>
              <div class="part-title">
                <span></span>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    1.党委审查，组织谈话
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    2.党委会审议通过
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="part-main-div position-relative part-main-div-s">
            <div class="part-item-main lt position-relative">
              <div
                class="part-title part-title-top"
                style="background: transparent; color: transparent"
              >
                fdsa
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  style="left: -20%; width: 170%; top: 8%"
                />
              </div>
              <div class="part-title">
                <span style="top: -106px; height: 106px"></span>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    1.预备党员通知单
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    2.组织备案
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    3.预备期一年<br />(下发预备党员考察表)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="part-main-div position-relative">
            <div class="part-item-main lt">
              <div
                :class="['part-title', 'choose', 'part-title-top', 'cursor-p']"
                @click="
                  linkTo('enterprise_wisdom_party_development_regularList', {
                    range: '7,10',
                    type: 4,
                    organ_id: listQuery.organ_node,
                  })
                "
              >
                <div class="count-span">
                  转为正式党员
                  <p>（{{ countArr["4"] }}人）</p>
                </div>
              </div>
              <div class="part-title">
                <span></span>
                <p class="mgb7 grey2 mb-1">必备材料：</p>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    1.个人转正申请
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    2.支部会决议
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    3.个人思想汇报<br />(至少两份)
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    4.预备党员考察表
                  </p>
                </div>
              </div>
              <div class="part-title">
                <span></span>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    1.党委会审议通过
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    2.转正通知单
                  </p>
                </div>
                <div class="cursor-p part-process">
                  <img
                    src="@/assets/images/enterprise/icon_process_selected.png"
                    class="vertical-top d-inline-block"
                    style="width: 20px"
                  />
                  <p class="d-inline-block" style="line-height: 18px">
                    3.组织备案
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </n-scroll>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { hasPermissionArr } from "@/plugins/permission_tools.js";
export default {
  data() {
    return {
      countArr: { 1: 0, 2: 0, 3: 0, 4: 0 },
      listQuery: {
        page: -1,
        organ_node: this.$organ_id_en_or_pro(this),
        // 1:申请中
        // 2:积极分子-未确认
        // 3:积极分子-已取消
        // 4:积极分子-已确认
        // 5:预备党员-资料未补全
        // 6:预备党员-资料已补全
        // 7:正式党员-未确认
        // 8:正式党员-已取消
        // 9:正式党员-已确认
        // 10:正式党员-正式党员
      },
    };
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  mounted() {
    this.getlist();
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.getlist();
    },
    getlist() {
      this.queryUnionPartyPersonnelDevelopList({ pd_states_start: 1 }, 1); //个人申请
      this.queryUnionPartyPersonnelDevelopList(
        { pd_states_start: 2, pd_states_end: 4 },
        2
      ); //确定积极分子
      this.queryUnionPartyPersonnelDevelopList(
        { pd_states_start: 5, pd_states_end: 6 },
        3
      ); //预备党员
      this.queryUnionPartyPersonnelDevelopList(
        { pd_states_start: 7, pd_states_end: 10 },
        4
      ); //正式党员
    },
    async queryUnionPartyPersonnelDevelopList(data, type) {
      let res = await api.queryUnionPartyPersonnelDevelopList({
        ...data,
        ...this.listQuery,
      });
      this.$set(this.countArr, String(type), res.total_count);
    },
    handleFilterChange(data) {
      this.listQuery.organ_node = data;
      this.getlist();
    },
    linkTo(name, query) {
      // 是否有确认发展对象的权限
      if (name == "enterprise_wisdom_party_development_activistList_add") {
        if (!hasPermissionArr(["UnionPartyPersonnelDevelop-confirm"])) {
          return;
        }
      }

      if (query.organ_id && query.organ_id == this.$organ_id_en_or_pro(this)) {
        query.organ_id = 0;

        this.$router.linkTo(name, query ? query : null);
      } else {
        this.$router.linkTo(name, query ? query : null);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.apply-title p {
  display: inline-block;
  float: none;
  width: auto;
  padding: 7px 15px;
  border-radius: 8px;
  text-align: left;
}

.apply-title p.choose {
  background: $linear-e;
  color: white;
}

.p-inf-main {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.part-main-div {
  width: 15%;
  min-width: 180px;
  font-size: 17px;

  .part-item-main {
    width: 65%;
    height: 100%;
    .count-span {
      text-align: center;
      width: 100%;
      line-height: 26px;
    }
    .part-title {
      position: relative;
      width: 100%;
      padding: 25% 0;
      line-height: 20px;
      text-align: center;
      color: $color-3;
      background: $linear-e;
      border-radius: 8px;
      font-size: 16px;

      img.arrows {
        width: 30%;
        position: absolute;
        right: -40%;
        top: 50%;
        margin-top: -15px;
      }

      p {
        width: calc(100% - 25px);
        text-align: left;
        padding-left: 5px;
        font-size: 14px;
      }
      .part-process {
        margin-bottom: 10px;
      }
    }
    .part-title-top {
      padding: 0;
      height: 85px;
      line-height: 85px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        text-align: center;
      }
    }
    .part-title.choose {
      color: white;
      background: $linear-e;
    }

    .part-title:not(:first-child) {
      margin-top: 60px;
      background: $color-5;
      padding: 10px 5px;
      color: $color-1;

      span {
        position: absolute;
        width: 0px;
        border-left: 1px dashed #bfc5d5;
        height: 60px;
        top: -60px;
        left: 50%;
      }
    }
  }
}
.part-main-div-s {
  display: flex;
  align-items: center;
}
</style>
