<template>
  <div class="h-100 w-100 bg-secondary table-list-wrap">
    <n-dialog
      ref="dialog"
      :diaTit="'选择人员'"
      :diaWidth="'700px'"
      class="stretch-dialog person-dialog"
      @beforeClose="dialogClose"
    >
      <template slot="diaSlot">
        <n-choose-person
          ref="singlechoose"
          :personIDsArr="personIDsArr[perIndex]"
          @choosePersonNodes="choosePersonNodes"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="bg-white rounded-1 flex-fill px-1 py-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long-small must" label="所属模块：">
            <el-select
              filterable
              v-model="ruleform.module_eng_union"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, i) in module"
                :key="i"
                :label="item.module_chn"
                :value="item.module_eng"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must form-item-long-height"
            label="消息类型："
          >
            <el-radio-group v-model="ruleform.msg_type" class="el-radio-form">
              <el-radio :label="1">通知</el-radio>
              <el-radio :label="2">待办</el-radio>
            </el-radio-group>
          </el-form-item>
          <br />
          <el-form-item class="form-item-long-small must" label="消息名称：">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="ruleform.msg_config"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form-item-long-small must form-item-long-height"
            label="消息状态："
          >
            <el-switch
              v-model="ruleform.msg_config_status"
              :active-value="2"
              :inactive-value="1"
              class="table-switch"
            ></el-switch>
          </el-form-item>
          <br />
          <el-form-item
            class="form-item-long-small must mt-1"
            label="推送内容："
          >
            <div class="p-1 msg-cont">
              <div class="d-flex align-items-center">
                <el-form-item
                  class="form-item-long-small must"
                  label="提示语："
                >
                  <el-input
                    type="text"
                    placeholder="请输入"
                    v-model="ruleform.msg_config_content"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="text-danger mt-05">
                温馨提示:变化的数据在提示语中,请用"$$"代替
              </div>
            </div>
          </el-form-item>
          <br />

          <el-form-item
            class="form-item-long-small must mt-1"
            label="消息说明："
          >
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="4"
              v-model="ruleform.msg_config_note"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="dis-flex-form-item form-item-long must"
            label="消息来去："
          >
            <div class="flex-fill">
              <nAddItemContent
                :height="'280px'"
                :width="'600px'"
                class="mb-2"
                :isAdd="j == 0"
                @addFun="addBlockFun()"
                @reduce="deleteBlockFun(j)"
                v-for="(fromItem, j) in ruleform.desc_list"
                :key="j"
                @click="choosePersonClick(j)"
              >
                <template slot="content-add">
                  <div>
                    <el-form-item
                      class="form-item-long must mt-1"
                      label="消息来源："
                    >
                      <n-treeselect
                        :ref="'treeselect' + j"
                        :treeData="treeData"
                        :Isvalue="true"
                        @getSelectNode="(node) => getSelectNode(node, j)"
                        v-model="fromItem.msg_config_desc_from"
                      />
                    </el-form-item>
                    <el-form-item
                      class="form-item-long must mt-1 form-item-long-height"
                      label="推送对象："
                    >
                      <el-radio-group
                        v-model="choosePerson[j]"
                        @change="changePerson(choosePerson[j], j)"
                      >
                        <el-radio :label="1">所有人员</el-radio>
                        <el-radio :label="2">指定人员</el-radio>
                      </el-radio-group>
                      <template v-if="choosePerson[j] == 2">
                        <nAddItemContent
                          @addFun="addPersons(j)"
                          :width="'360px'"
                          :height="'140px'"
                          :backgroundColor="'#ffffff'"
                        >
                          <template slot="content-add">
                            <div
                              class="content-item"
                              v-for="(item, index) in personList[j]"
                              :key="index"
                            >
                              <template v-if="item && item.account_name">
                                <span
                                  >{{ item.account_name }}【{{
                                    item.account_job
                                  }}】</span
                                ></template
                              >
                              <i
                                class="iconfont btn-btn_detail_minus_02 font-20"
                                @click="reduceFun(j, index, item)"
                              ></i>
                            </div>
                          </template>
                        </nAddItemContent>
                      </template>
                    </el-form-item>
                  </div>
                </template>
              </nAddItemContent>
            </div>
          </el-form-item>
        </el-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        class="mt-1"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import { mapGetters } from "vuex";
export default {
  mixins: [confirm],
  data() {
    return {
      title: "",
      ruleform: {
        msg_config: "",
        module_eng_union: null,
        msg_config_status: 1,
        msg_config_content: "",
        msg_type: 1,
        msg_config_push_type: 1,
        msg_config_push_time: "",
        msg_config_push_counts: null,
        msg_config_push_delta: null,
        msg_config_note: null,
        desc_list: [],
      },
      rules: {
        module_eng_union: [
          {
            required: true,
            message: "请选择所属模块",
          },
        ],
        msg_config: [
          {
            required: true,
            message: "请输入消息名称",
          },
        ],
        msg_config_content: [
          {
            required: true,
            message: "请输入推送内容提示语",
          },
        ],
        msg_config_note: [
          {
            required: true,
            message: "请输入消息说明",
          },
        ],
        desc_list: [
          {
            validator: null,
          },
        ],
      },
      module: [],
      personIDsArr: [],
      perIndex: 0,
      personList: [[]],
      choosePerson: [],
      fomat: {
        format: "HH:mm",
      },
      personListAll: [[]],
      treeData: this.$store.getters.organTreeData,
      examine_id: null, //编辑的id
    };
  },
  computed: {
    ...mapGetters(["projects"]),
  },
  watch: {},
  created() {
    this.getmodule();
    this.queryOrganTree();
    this.rules.desc_list[0].validator = (rule, list, callback) => {
      let length = list.length;
      for (let i = 0; i < length; i++) {
        if (list[i].msg_config_desc_from == "") {
          return callback(
            new Error(
              `请选择` +
                (length > 1 ? `第${i + 1}个` : "") +
                `消息来去的消息来源`
            )
          );
        }
        if (list[i].msg_config_desc_to == "") {
          return callback(
            new Error(
              `请添加` +
                (length > 1 ? `第${i + 1}个` : "") +
                `消息来去的接收对象`
            )
          );
        }
      }
    };
    this.examine_id =
      this.$route.query.id &&
      parseInt(this.Base64.decode(this.$route.query.id));
  },
  mounted() {
    if (!isNaN(this.examine_id)) {
      this.title = "编辑消息配置";
      this.queryMessageMsgConfig();
    } else {
      this.title = "新增消息配置";
      this.addBlockFun();
    }
  },
  methods: {
    getSelectNode(node, i) {
      this.$set(
        this.ruleform.desc_list[i],
        "msg_config_desc_from",
        String(node.tag)
      );
    },
    dialogClose() {
      this.$refs.singlechoose.choosePersonIDsArr =
        this.personIDsArr[this.perIndex];
    },
    async queryOrganTree() {
      let res = await api.queryOrganTree({
        organ_node: 0,
      });
      let data = [
        {
          tag: "0",
          node: {
            organ: "全部",
            organ_child_node: "",
            organ_company: "",
            organ_id: 0,
            organ_parent_node: "",
            organ_pid: 0,
            organ_type: 10,
          },
          leaves: [],
        },
        ...res.result,
      ];
      this.treeData = data;
    },
    async queryMessageMsgConfig() {
      let res = await api.queryMessageMsgConfig({
        msg_config_id: this.examine_id,
      });
      if (res.result.length > 0) {
        const json = [
          "module_eng_union",
          "msg_type",
          "msg_config_status",
          "msg_config",
          "msg_config_push_type",
          "msg_config_push_time",
          "msg_config_push_counts",
          "msg_config_push_delta",
          "msg_config_content",
          "msg_config_note",
        ];
        this.$utils.renderRuleForm(this, json, this.ruleform, res.result[0]);
        let list = res.result[0].desc_list;
        for (let i = 0; i < list.length; i++) {
          this.ruleform.desc_list[i] = {
            msg_config_desc_from:
              list[i].msg_config_desc_from == "*"
                ? "0"
                : Number(list[i].msg_config_desc_from),
            msg_config_desc_to: list[i].msg_config_desc_to,
          };
          this.personIDsArr.push([]);
          this.personList.push([]);
          this.choosePerson.push(list[i].msg_config_desc_to == "*" ? 1 : 2);
          if (this.choosePerson[i] == 2) {
            this.personIDsArr[i] = list[i].msg_config_desc_to
              .split(",")
              .map(Number);
            let arr = await this.queryAccount(this.personIDsArr[i]);
            if (arr[0]) {
              this.$set(this.personList, i, arr);
            }
          }
        }
      }
    },
    async getmodule() {
      let res = await api.queryRelation({
        module_type: 2,
        page: -1,
      });
      this.module = res.result;
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      return data.result;
    },
    // 选择人员回调

    async choosePersonNodes(nodes) {
      this.personIDsArr[this.perIndex] = nodes.map((item) => item.account_id);
      this.$set(this.personList, this.perIndex, [...nodes]);
      this.ruleform.desc_list[this.perIndex].msg_config_desc_to =
        this.personIDsArr[this.perIndex].join(",");
      this.$refs.dialog.cancel();
    },
    // 提交
    async submitFun() {
      if (this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        let list = this.ruleform.desc_list;
        for (let i = 0; i < list.length; i++) {
          list[i].msg_config_desc_from == 0 &&
            (list[i].msg_config_desc_from = "*");
        }
        this.ruleform.msg_config_push_counts = Number(
          this.ruleform.msg_config_push_counts
        );
        if (isNaN(this.examine_id)) {
          await api.uploadMessageMsgConfig(this.ruleform);
        } else {
          await api.updateMessageMsgConfig({
            ...this.ruleform,
            msg_config_id: this.examine_id,
          });
        }
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$router.go(-1);
          },
        });
      }
    },
    changePerson(falg, i) {
      if (falg == 2) {
        this.personIDsArr[i] = [];
        this.ruleform.desc_list[i].msg_config_desc_to = "";
      } else {
        this.ruleform.desc_list[i].msg_config_desc_to = "*";
      }
    },
    addBlockFun() {
      this.ruleform.desc_list.push({
        msg_config_desc_from: "0",
        msg_config_desc_to: "*",
      });
      this.personList.push([]);
      this.personIDsArr.push([]);
      this.choosePerson.push(1);
    },
    deleteBlockFun(ind) {
      this.ruleform.desc_list.splice(ind, 1);
      this.personIDsArr.splice(ind, 1);
      this.personList.splice(ind, 1);
      this.choosePerson.splice(ind, 1);
    },
    addPersons(i) {
      this.perIndex = i;
      this.$refs.dialog.show();
      if (this.$refs.singlechoose) {
        this.$refs.singlechoose.setSelectPerson(this.personList[i]);
      } else {
        this.$nextTick(() => {
          this.$refs.singlechoose.setSelectPerson(this.personList[i]);
        });
      }
    },
    reduceFun(i, ind, data) {
      this.personList[i].splice(ind, 1);
      let indID = this.personIDsArr[i].indexOf(data.account_id);
      this.personIDsArr[i].splice(indID, 1);
      this.ruleform.desc_list[i].msg_config_desc_to =
        this.personIDsArr[i].join(",");
    },
  },
};
</script>
<style scoped lang="scss">
.msg-cont {
  background: $color-2;
  background: $lightgrey;
}
.addperson {
  width: 30px;
  position: absolute;
  background: #cddbf7;
  top: 0;
  right: 0;
}
.fromto-item {
  background: $lightgrey;
}
.fromto-btn {
  background: #cddbf7;
  top: 0;
  right: 0;
  img {
    width: 30px;
  }
  &.fromto-btn2 {
    background-color: #eceef4;
  }
}
.access-choose-item {
  position: relative;
  display: inline-block;
  padding: 0 10px;
  color: $color-1;
  margin-bottom: 10px;
  margin-top: 20px;
  img {
    position: absolute;
    width: 18px;
    border-radius: 100%;
    top: -17px;
    right: 0;
    cursor: pointer;
    font-size: 22px;
    background-color: $color-2;
  }
}
</style>
<style lang="scss">
.msgPopover {
  width: 450px !important;
  ul {
    font-weight: 600;
    ol {
      font-weight: normal;
    }
  }
}
</style>
