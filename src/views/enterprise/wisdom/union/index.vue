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
            :value="listQuery.organ_node"
          />
        </div>
      </div>
    </div>
    <div class="flex-fill p-2">
      <n-scroll>
        <div
          v-permission="['UnionPartyHardWorker']"
          class="p-inf-main text-center clear mb-1"
          style="overflow-y: auto; margin-bottom: 50px"
        >
          <div
            class="part-main-div position-relative d-flex align-items-center"
            @click="
              linkTo('enterprise_oa_hardworkers', {
                organ_id: listQuery.organ_node,
                t: 11,
                auth: 'UnionPartyHardWorker',
              })
            "
          >
            <div class="part-item-main">
              <div class="part-title choose part-title-top cursor-p">
                <div class="count-span">
                  困难职工申请
                  <p>（{{ countArr["1"] }}人）</p>
                </div>
              </div>
            </div>
            <img
              src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
              class="d-inline-block arrows flex-fill ml-1 mr-1"
            />
          </div>
          <div
            class="part-main-div position-relative d-flex align-items-center"
            @click="
              linkTo('enterprise_wisdom_union_hardworkers_publicityList', {
                organ_id: listQuery.organ_node,
                t: 0,
              })
            "
          >
            <div class="part-item-main">
              <div class="part-title choose part-title-top cursor-p">
                <div class="count-span">
                  困难职工公示
                  <p>（{{ countArr["2"] }}人）</p>
                </div>
              </div>
            </div>
            <img
              src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
              class="d-inline-block arrows ml-1 flex-fill mr-1"
            />
          </div>
          <div
            class="part-main-div position-relative d-flex align-items-center"
          >
            <div
              class="flex-column d-flex align-items-center flex-fill position-relative"
            >
              <span class="line-span position-absolute"></span>
              <div
                class="position-relative d-flex align-items-center mb-05 w-100"
                @click="
                  linkTo('enterprise_wisdom_union_hardworkers_confirm', {
                    organ_id: listQuery.organ_node,
                    t: 0,
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  class="d-inline-block arrows ml-1 flex-fill mr-1"
                />
                <div class="part-item-main">
                  <div class="part-title choose part-title-top cursor-p">
                    <div class="count-span">
                      特困职工列表
                      <p>（{{ countArr["3"] }}人）</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="position-relative d-flex align-items-center mb-05 w-100"
                @click="
                  linkTo('enterprise_wisdom_union_hardworkers_confirm', {
                    organ_id: listQuery.organ_node,
                    t: 1,
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  class="d-inline-block arrows ml-1 flex-fill mr-1"
                />
                <div class="part-item-main">
                  <div class="part-title choose part-title-top cursor-p">
                    <div class="count-span">
                      重困职工列表
                      <p>（{{ countArr["4"] }}人）</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="position-relative d-flex align-items-center w-100"
                @click="
                  linkTo('enterprise_wisdom_union_hardworkers_confirm', {
                    organ_id: listQuery.organ_node,
                    t: 2,
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  class="d-inline-block arrows ml-1 flex-fill mr-1"
                />
                <div class="part-item-main">
                  <div class="part-title choose part-title-top cursor-p">
                    <div class="count-span">
                      一般困难职工列表
                      <p>（{{ countArr["5"] }}人）</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-permission="['UnionPartySubsidyStudy']"
          class="p-inf-main text-center clear mgb30"
          style="overflow-y: auto; margin-bottom: 100px"
        >
          <div
            class="part-main-div position-relative d-flex align-items-center"
            @click="
              linkTo('enterprise_oa_helpStudy', {
                organ_id: listQuery.organ_node,
                t: 12,
                auth: 'UnionPartySubsidyStudy',
              })
            "
          >
            <div class="part-item-main">
              <div class="part-title choose part-title-top cursor-p">
                <div class="count-span">
                  金秋助学申请
                  <p>（{{ countArr["6"] }}人）</p>
                </div>
              </div>
            </div>
            <img
              src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
              class="d-inline-block arrows flex-fill ml-1 mr-1"
            />
          </div>
          <div
            class="part-main-div position-relative d-flex align-items-center"
            @click="
              linkTo(
                'enterprise_wisdom_union_unionPartySubsidy_publicityList',
                { t: 1, organ_id: listQuery.organ_node }
              )
            "
          >
            <div class="part-item-main">
              <div class="part-title choose part-title-top cursor-p">
                <div class="count-span">
                  金秋助学公示
                  <p>（{{ countArr["7"] }}人）</p>
                </div>
              </div>
            </div>
            <img
              src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
              class="d-inline-block arrows ml-1 flex-fill mr-1"
            />
          </div>
          <div
            class="part-main-div position-relative d-flex align-items-center"
            @click="
              linkTo('enterprise_wisdom_union_unionPartySubsidy_confirm', {
                organ_id: listQuery.organ_node,
                t: 1,
              })
            "
          >
            <div class="part-item-main">
              <div class="part-title choose part-title-top cursor-p">
                <div class="count-span">
                  金秋助学列表
                  <p>（{{ countArr["8"] }}人）</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-permission="[
            'UnionPartySubsidySick',
            'UnionPartySubsidyCompensate',
          ]"
          class="p-inf-main text-center clear mt-3"
          style="overflow-y: auto"
        >
          <div
            class="part-main-div position-relative d-flex align-items-center"
            style="min-width: 140px; width: 140px"
          >
            <div class="part-item-main">
              <div class="part-title choose part-title-top">
                <div class="count-span">互助保险</div>
              </div>
            </div>
          </div>
          <div
            class="part-main-div position-relative d-flex align-items-center"
          >
            <div
              class="flex-column d-flex align-items-center flex-fill position-relative"
            >
              <span class="line-span position-absolute"></span>
              <div
                class="position-relative d-flex align-items-center w-100"
                style="margin-bottom: 50px"
                @click="
                  linkTo('enterprise_oa_sickCondolence', {
                    organ_id: listQuery.organ_node,
                    t: 13,
                    auth: 'UnionPartySubsidySick',
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  class="d-inline-block arrows ml-1 flex-fill mr-1"
                />
                <div class="part-item-main">
                  <div class="part-title choose part-title-top cursor-p">
                    <div class="count-span">
                      生病住院慰问申请
                      <p>（{{ countArr["9"] }}人）</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="position-relative d-flex align-items-center w-100"
                @click="
                  linkTo('enterprise_oa_compensate', {
                    organ_id: listQuery.organ_node,
                    t: 14,
                    auth: 'UnionPartySubsidyCompensate',
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  class="d-inline-block arrows ml-1 flex-fill mr-1"
                />
                <div class="part-item-main">
                  <div class="part-title choose part-title-top cursor-p">
                    <div class="count-span">
                      补偿申请
                      <p>（{{ countArr["11"] }}人）</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="part-main-div position-relative d-flex align-items-center"
            @click="
              linkTo('enterprise_wisdom_union_unionPartySubsidy_confirm', {
                organ_id: listQuery.organ_node,
                t: 2,
              })
            "
          >
            <div class="flex-column d-flex flex-fill align-items-center">
              <div
                class="position-relative d-flex align-items-center w-100"
                style="margin-bottom: 50px"
              >
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  class="d-inline-block arrows ml-1 flex-fill mr-1"
                />
                <div class="part-item-main">
                  <div class="part-title choose part-title-top cursor-p">
                    <div class="count-span">
                      生病住院慰问列表
                      <p>（{{ countArr["10"] }}人）</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="position-relative d-flex align-items-center w-100"
                @click="
                  linkTo('enterprise_wisdom_union_unionPartySubsidy_confirm', {
                    organ_id: listQuery.organ_node,
                    t: 3,
                  })
                "
              >
                <img
                  src="@/assets/images/enterprise/icon_partymember_procecss_longarrow.png"
                  class="d-inline-block arrows ml-1 flex-fill mr-1"
                />
                <div class="part-item-main">
                  <div class="part-title choose part-title-top cursor-p">
                    <div class="count-span">
                      补偿申请列表
                      <p>（{{ countArr["12"] }}人）</p>
                    </div>
                  </div>
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
export default {
  data() {
    return {
      countArr: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
      },
      listQuery: {
        page: -2,
        page_size: 1,
        organ_node: this.$organ_id_en_or_pro(this),
      },
    };
  },
  activated() {
    this.getlist();
  },
  computed: {
    treeData() {
      return this.$store.getters.organTreeData;
    },
  },
  methods: {
    // 树形下拉选择
    getSelectValue(node) {
      this.listQuery.organ_node = node.tag;
      this.getlist();
    },
    getlist() {
      // 困难职工查询统计
      this.queryUnionPartyHardWorkerList(this.listQuery, 1);
      this.queryUnionPartyHardWorkerList(
        {
          ...this.listQuery,
          hard_worker_hard_state_start: 2,
          hard_worker_hard_state_end: 6,
        },
        2
      );
      this.queryUnionPartyHardWorkerList(
        {
          ...this.listQuery,
          hard_worker_hard_state_start: 5,
          hard_worker_hard_state_end: 6,
          hard_worker_hard_type: 1,
        },
        3
      );
      this.queryUnionPartyHardWorkerList(
        {
          ...this.listQuery,
          hard_worker_hard_state_start: 5,
          hard_worker_hard_state_end: 6,
          hard_worker_hard_type: 2,
        },
        4
      );
      this.queryUnionPartyHardWorkerList(
        {
          ...this.listQuery,
          hard_worker_hard_state_start: 5,
          hard_worker_hard_state_end: 6,
          hard_worker_hard_type: 3,
        },
        5
      );

      // 签领管理查询统计
      this.queryUnionPartySubsidyList(
        { ...this.listQuery, subsidy_type: 2 },
        6
      );
      this.queryUnionPartySubsidyList(
        {
          ...this.listQuery,
          subsidy_state_start: 2,
          subsidy_state_end: 5,
          subsidy_type: 2,
        },
        7
      );
      this.queryUnionPartySubsidyList(
        {
          ...this.listQuery,
          subsidy_state_start: 5,
          subsidy_state_end: 5,
          subsidy_type: 2,
        },
        8
      );

      this.queryUnionPartySubsidyList(
        { ...this.listQuery, subsidy_type: 3 },
        9
      );
      this.queryUnionPartySubsidyList(
        { ...this.listQuery, revise_info_state: 3, subsidy_type: 3 },
        10
      );

      this.queryUnionPartySubsidyList(
        { ...this.listQuery, subsidy_type: 4 },
        11
      );
      this.queryUnionPartySubsidyList(
        { ...this.listQuery, revise_info_state: 3, subsidy_type: 4 },
        12
      );
    },
    // 困难职工查询统计
    async queryUnionPartyHardWorkerList(data, type) {
      let res = await api.queryUnionPartyHardWorkerList(data);
      this.$set(this.countArr, String(type), res.total_count);
    },
    // 签领管理查询统计
    async queryUnionPartySubsidyList(data, type) {
      let res = await api.queryUnionPartySubsidyList(data);
      this.$set(this.countArr, String(type), res.total_count);
    },
    linkTo(name, query) {
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

<style lang="scss" scoped>
.line-span {
  width: 3px;
  background: $linear-c;
  left: 8px;
  top: 36px;
  bottom: 35px;
  z-index: 10;
}
.apply-title p {
  display: inline-block;
  float: none;
  width: auto;
  padding: 7px 15px;
  border-radius: 8px;
  text-align: left;
}

.apply-title p.choose {
  background: $linear-a;
  color: white;
}

.p-inf-main {
  display: flex;
  flex-wrap: nowrap;
}

.part-main-div {
  width: 25%;
  min-width: 180px;
  font-size: 17px;

  .part-item-main {
    width: 140px;
    .count-span {
      font-size: 14px;
      text-align: center;
      width: 100%;
      line-height: 22px;
    }
    .part-title {
      position: relative;
      width: 100%;
      padding: 25% 0;
      line-height: 20px;
      text-align: center;
      color: $color-1;
      background: $linear-a;
      border-radius: 8px;
      font-size: 16px;

      img.arrows {
        // width: 30%;
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
      height: 75px;
      line-height: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        text-align: center;
      }
    }
    .part-title.choose {
      color: white;
      background: $linear-a;
    }

    .part-title:not(:first-child) {
      margin-top: 60px;
      background: $color-2;
      padding: 10px 5px;
      color: $color-1;

      span {
        position: absolute;
        width: 0px;
        border-left: 1px dashed #bfc5d5;
        height: 60px;
        // background: $color-1
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
