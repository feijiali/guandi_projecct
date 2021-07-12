<template>
  <div class="container-all">
    <n-dialog
      ref="dialog"
      :diaTit="
        ['选择完全控制人员', '选择访问权限人员', '选择修改权限人员'][type]
      "
      :diaWidth="'50%'"
      class="stretch-dialog person-dialog"
    >
      <template slot="diaSlot">
        <n-choose-person
          :isSingle="false"
          ref="singlechoose"
          :personIDsArr="personIDsArr"
          @choosePersonNodes="choosePersonFun"
          :checkAllPerson="true"
        ></n-choose-person>
      </template>
    </n-dialog>
    <div
      class="container-div flex-column justify-content-between d-flex pr-2 pb-2"
      style="margin: 0"
    >
      <div class="p-1" style="height: calc(100% - 70px)">
        <nBackTop :title="title" />
        <n-scroll>
          <el-form
            ref="ruleform"
            label-width="105px"
            class="el-form-box"
            :model="ruleform"
          >
            <div class="pd mb-1">
              <el-form-item class="form-item-long must" label="文件夹名称：">
              </el-form-item>
              <el-input
                :disabled="isDisabled"
                placeholder="请输入"
                style="width: 500px"
                v-model="ruleform.information_resources_name"
              >
              </el-input>
            </div>
            <div class="pd mb-1">
              <el-form-item class="form-item-long must" label="上级文件夹：">
              </el-form-item>
              <el-input disabled style="width: 500px" v-model="lastHolderName">
              </el-input>
            </div>
            <div class="pd mb-1">
              <el-form-item class="form-item-long must" label="完全控制：">
              </el-form-item>
              <div class="email_box position-relative" style="width: 500px">
                <person-checked
                  key-str="full"
                  @showDalog="showTargerAddLayer('full', 0)"
                  :PersonList="full_list"
                  @DeletPerson="deletPerson"
                />
              </div>
            </div>
            <div class="pd mb-1">
              <el-form-item class="form-item-long must" label="访问权限：">
              </el-form-item>
              <div class="email_box position-relative" style="width: 500px">
                <person-checked
                  key-str="access"
                  @showDalog="showTargerAddLayer('access', 1)"
                  :PersonList="access_list"
                  @DeletPerson="deletPerson"
                />
              </div>
            </div>
            <div class="pd mb-1">
              <el-form-item class="form-item-long must" label="修改权限：">
              </el-form-item>
              <div class="email_box position-relative" style="width: 500px">
                <person-checked
                  key-str="update"
                  @showDalog="showTargerAddLayer('update', 2)"
                  :PersonList="update_list"
                  @DeletPerson="deletPerson"
                />
              </div>
            </div>
          </el-form>
        </n-scroll>
      </div>
      <div class="d-flex justify-content-end mt-4">
        <n-button
          :btnText="'取消'"
          :width="'150px'"
          :colorBtn="'grey'"
          @buttonClick="cancel"
        ></n-button>
        <n-button
          class="ml-2"
          :btnText="'提交'"
          :width="'150px'"
          :colorBtn="'blue'"
          @buttonClick="submitFun"
        ></n-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";
import upload from "@/mixins/upload";
import PersonChecked from "./components/PersonChecked";
export default {
  components: {
    PersonChecked,
  },
  mixins: [table, confirm, upload],
  data() {
    return {
      isShow: this.$route.meta.isProject,
      ruleform: {
        information_resources_type: 1,
        information_resources_pid: this.$route.query.pid
          ? this.$route.query.pid
          : -1,
        information_resources_full_contro: "*",
        information_resources_access_contro: "*",
        information_resources_update_contro: "*",
      },
      rules: {
        information_resources_name: [
          {
            required: true,
            message: "请输入文件夹名称",
          },
        ],
        // information_resources_full_contro: [
        //   {
        //     required: true,
        //     message: "请选择完全控制人员",
        //   },
        // ],
        // information_resources_access_contro: [
        //   {
        //     required: true,
        //     message: "请选择访问权限人员",
        //   },
        // ],
        // information_resources_update_contro: [
        //   {
        //     required: true,
        //     message: "请选择修改权限人员",
        //   },
        // ],
      },
      key_type: "",
      personIDsArr: [],
      full_list: [],
      access_list: [],
      update_list: [],
      personListAll: [],
      lastHolderName: this.$route.query.tagName
        ? this.$route.query.tagName
        : "/",
      isDisabled: !!this.$route.query.id, // 是否可以输入
      title: this.$route.query.id ? "文件夹属性" : "新建文件夹",
      allPersonId: "", // 项目级选择全体人员 实际为该项目下全部人员id
      type: 0,
    };
  },
  async created() {
    this.isShow && (await this.getProAllPerson());
    this.$route.query.id &&
      this.queryInformationResources(
        Number(this.Base64.decode(this.$route.query.id))
      );
    this.$route.query.pid &&
      this.queryInformationResources(Number(this.$route.query.pid));
  },
  methods: {
    async getProAllPerson() {
      const res = await api.queryOrganAccount({
        account_search: "",
        account_status_not: 2,
        organ_node: this.$organ_id_en_or_pro(this),
        page: 0,
        staff_status: 1,
      });
      const data = res.result;
      this.allPersonId = data
        .map((item) => {
          return item.account_id;
        })
        .join(",");
    },
    // 查询详情
    async queryInformationResources(id) {
      const { result } = await api.queryInformationResources({
        information_resources_id: id,
      });

      if (this.$route.query.id) {
        this.ruleform = result[0];
        const parentName =
          this.ruleform.information_resources_parent_node_name.split(",");
        this.$set(
          this,
          "lastHolderName",
          parentName.length > 1 ? parentName[parentName.length - 2] : "/"
        );
        this.ruleform.operation_type = 4;
      }
      if (this.$route.query.pid) {
        this.ruleform.information_resources_full_contro =
          result[0].information_resources_full_contro;
        this.ruleform.information_resources_access_contro =
          result[0].information_resources_access_contro;
        this.ruleform.information_resources_update_contro =
          result[0].information_resources_update_contro;
      }
      const keyArr1 = ["full", "access", "update"];
      keyArr1.forEach(async (key) => {
        if (result[0]["information_resources_" + key + "_contro"] != "*") {
          const len1 =
            result[0]["information_resources_" + key + "_contro"].split(
              ","
            ).length;
          const len2 = this.allPersonId.split(",").length;
          // 项目级下面全体人员回填
          if (this.isShow && len1 == len2) {
            this[key + "_list"] = [{ account_name: "全体人员" }];
          } else {
            this[key + "_list"] = await this.queryAccount(
              result[0]["information_resources_" + key + "_contro"]
                .split(",")
                .map(Number)
            );
          }
        } else {
          this[key + "_list"] = [{ account_name: "全体人员" }];
        }
      });
    },
    // 删除人员
    deletPerson(type, index, data) {
      this.personIDsArr = this.ruleform[
        "information_resources_" + type + "_contro"
      ]
        .split(",")
        .map(Number);
      this[type + "_list"].splice(index, 1);
      const indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
      this.ruleform["information_resources_" + type + "_contro"] =
        this.personIDsArr.join(",");
    },
    // 点击选择考核对象
    showTargerAddLayer(type, num) {
      this.type = num;
      this.key_type = type;
      this.$refs.dialog.show();
      if (this.$refs.singlechoose) {
        this.$refs.singlechoose.setSelectPerson(this[type + "_list"]);
      } else {
        this.$nextTick(() => {
          this.$refs.singlechoose.setSelectPerson(this[type + "_list"]);
        });
      }
      this.rebackPerson(type);
    },
    async rebackPerson(type) {
      const accountIds = this[type + "_list"].filter((item) => item.account_id);
      this.personIDsArr = accountIds.map((item) => item.account_id);
      await this.queryAccount(this.personIDsArr);
    },
    // 选择人员确认
    choosePersonFun(nodes) {
      if (nodes[0].account_name == "全体人员") {
        this.ruleform["information_resources_" + this.key_type + "_contro"] =
          "*";
        this[this.key_type + "_list"] = [...nodes];
      } else {
        this.personIDsArr = nodes.map((item) => item.account_id);
        this.ruleform["information_resources_" + this.key_type + "_contro"] =
          this.personIDsArr.join(",");
        this[this.key_type + "_list"] = [...nodes];
      }
      this.$refs.dialog.cancel();
    },
    // 查询人员
    async queryAccount(arr) {
      const data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      return data.result;
    },
    // 重命名提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      this.submitAllData();
    },
    // 提交所有数据接口
    async submitAllData() {
      if (!this.full_list.length) {
        this.$tip({
          isTip: true,
          message: "请选择完全控制人员",
        });
        return;
      }
      if (!this.access_list.length) {
        this.$tip({
          isTip: true,
          message: "请选择访问权限人员",
        });
        return;
      }
      if (!this.update_list.length) {
        this.$tip({
          isTip: true,
          message: "请选择修改权限人员",
        });
        return;
      }
      if (this.isShow) {
        this.ruleform.information_resources_full_contro == "*" &&
          (this.ruleform.information_resources_full_contro = this.allPersonId);
        this.ruleform.information_resources_access_contro == "*" &&
          (this.ruleform.information_resources_access_contro =
            this.allPersonId);
        this.ruleform.information_resources_update_contro == "*" &&
          (this.ruleform.information_resources_update_contro =
            this.allPersonId);
      }
      const subData = {
        resources_list: [],
      };
      subData.resources_list[0] = this.ruleform;
      await api[
        `${
          this.$route.query.id
            ? "updateInformationResources"
            : "uploadInformationResources"
        }`
      ](subData);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$bus.$emit("changeTag", "");
          this.$router.go(-1);
        },
      });
    },
    // 取消
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.email_box {
  display: flex;
  border: solid 1px $color-3;
  border-radius: 5px;
}
.pd ::v-deep {
  .el-input__suffix {
    top: 9px;
    right: 10px;
  }
  .el-form-item {
    margin-bottom: 6px !important;
  }
  .el-input__inner {
    // padding-left: 0;
    padding-right: 10px;
  }
  .el-input {
    width: 35%;
  }
}
</style>
