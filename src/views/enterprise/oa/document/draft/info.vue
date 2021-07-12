<!--
 * @Autor: 邓易
 * @Date: 2020-12-14 14:22:26
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-09 09:50:56
-->
<template>
  <div class="position-relative h-100 w-100">
    <div class="position-absolute left-box rounded-1 bg-white px-2 py-1">
      <n-scroll>
        <div style="display: none"><div id="print"></div></div>
        <div>
          <nBackTop title="代办发文详情" />
        </div>
        <div class="d-flex">
          <n-button
            :btnText="'审批'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="toApproal"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-btn_list_edit mr-1"></i>
            </template>
          </n-button>
          <n-button
            class="ml-2"
            :colorBtn="'green'"
            :btnText="'打印'"
            :width="'150px'"
            @buttonClick="submitFun"
          >
            <template v-slot:button-slot>
              <i class="iconfont btn-icon_homepage_menu_17 mr-1"></i> </template
          ></n-button>
        </div>
        <el-form
          ref="ruleform"
          id="ruleform1"
          class="el-form-box mt-2"
          :model="ruleform"
        >
          <table class="table-box1" border="1">
            <thead>
              <tr>
                <td colspan="2">
                  <div
                    class="
                      font-20
                      text-hover-danger
                      font-weight-bold
                      text-center
                    "
                  >
                    广东冠迪建设有限公司文件
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long" label="发文字号：">
                    <el-input
                      class="w-100"
                      placeholder="请输入"
                      v-model="ruleform.account_name"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item class="form-item-long must" label="缓急：">
                    <el-radio-group
                      v-model="ruleform.applyment_type"
                      class="el-radio-form"
                    >
                      <el-radio :label="1">常规</el-radio>
                      <el-radio :label="2">紧急</el-radio>
                      <el-radio :label="3">特急</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item class="form-item-long must" label="密级：">
                    <el-select
                      class="w-100"
                      v-model="ruleform.self_made_name"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, index) in HistoryName"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="签发：">
                    <el-input
                      class="w-100"
                      placeholder="从组织架构添加人员"
                      v-model="ruleform.account_name"
                    >
                      <i
                        @click="showTargerAddLayer"
                        slot="suffix"
                        class="iconfont btn-btn_detail_plus_01 add-btn"
                      ></i>
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="会签：">
                    <el-input
                      class="w-100"
                      placeholder="从组织架构添加人员"
                      v-model="ruleform.account_name"
                    >
                      <i
                        @click="showTargerAddLayer"
                        slot="suffix"
                        class="iconfont btn-btn_detail_plus_01 add-btn"
                      ></i>
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long must pd" label="主送：">
                    <el-input
                      class="w-100"
                      placeholder="从组织架构添加人员"
                      v-model="ruleform.account_name"
                    >
                      <i
                        @click="showTargerAddLayer"
                        slot="suffix"
                        class="iconfont btn-btn_detail_plus_01 add-btn"
                      ></i>
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="抄送：">
                    <el-input
                      class="w-100"
                      placeholder="从组织架构添加人员"
                      v-model="ruleform.account_name"
                    >
                      <i
                        @click="showTargerAddLayer"
                        slot="suffix"
                        class="iconfont btn-btn_detail_plus_01 add-btn"
                      ></i>
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item class="form-item-long" label="拟稿单位：">
                    <el-input
                      class="w-100"
                      placeholder="请输入"
                      v-model="ruleform.account_name"
                    ></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item class="form-item-long" label="拟稿人：">
                    <el-input
                      class="w-100"
                      placeholder="请输入"
                      v-model="ruleform.account_name"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item class="form-item-long" label="份数：">
                    <el-input
                      class="w-100"
                      placeholder="请输入"
                      v-model="ruleform.account_name"
                    ></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item class="form-item-long" label="印刷：">
                    <el-input
                      class="w-100"
                      placeholder="请输入"
                      v-model="ruleform.account_name"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long pd" label="校对：">
                    <el-input
                      class="w-100"
                      placeholder="从组织架构添加人员"
                      v-model="ruleform.account_name"
                    >
                      <i
                        @click="showTargerAddLayer"
                        slot="suffix"
                        class="iconfont btn-btn_detail_plus_01 add-btn"
                      ></i>
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item class="form-item-long must" label="标题：">
                    <el-input
                      class="w-100"
                      placeholder="请输入"
                      v-model="ruleform.account_name"
                    >
                    </el-input>
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
          <el-form-item class="form-item-long mt-1 file-node" label="附件：">
            <div class="cursor-p" @click="uploadFile">
              <i
                class="iconfont btn-btn_list_upload mr-05 text-hover-danger"
              ></i>
              <span class="text-hover-danger">上传附件</span>
            </div>
          </el-form-item>
          <h2>正文内容</h2>
        </el-form>
      </n-scroll>
    </div>
    <div class="position-absolute right-box rounded-1 bg-white p-1">
      <n-scroll>
        <nApprovalProcess
          style="width: 100%"
          :reviseArr="process_list"
          :types="types"
        />
      </n-scroll>
    </div>
  </div>
</template>

<script>
import DynamicEditor from "@/components/QillEditor";
import print from "@/plugins/print/printarea";
export default {
  components: {
    DynamicEditor,
  },
  data() {
    return {
      printObj: {
        id: "#print",
        popTitle: "盘点单明细", //打印标题
      },
      process_list: [],
      types: [],
      HistoryName: [],
      content: "2222",
      ruleform: {
        account_name: "",
      },
    };
  },
  created() {
    // 默认登录者
    this.ruleform.account_name = this.$store.state.user.userName;
    this.ruleform.loss_account_id_un = Number(
      this.$store.state.user.account_id
    );
  },
  methods: {
    toApproal() {
      this.linkTo("enterprise_oa_workbench_approval");
    },
    // 点击选择考核对象
    showTargerAddLayer() {
      this.$refs.dialog.show();
    },
    // 选择了考核对象后点击确认
    async choosePersonFun(data) {
      this.ruleform.loss_account_id_un = data;
      await this.queryAccount({ account_ids: String(data) });
      this.$refs.dialog.cancel();
      let person = this.personListAll.filter((item) => {
        return data == item.account_id;
      });
      this.$set(this.ruleform, "account_name", person[0].account_name);
    },
    // 查询人员
    async queryAccount(obj) {
      let data = await api.queryAccount(obj);
      this.personListAll = data.result;
    },
    submitFun() {
      let ele = document.getElementById("print");
      ele.innerHTML = "";
      let form = document.getElementById("ruleform1").cloneNode(true);
      let textNode = document.querySelector(".ql-editor").cloneNode(true);
      let icons = [...form.querySelectorAll("i.iconfont")];
      let radios = [...form.querySelectorAll(".el-radio")];
      let file_node = [...form.querySelectorAll(".file-node")];
      file_node.forEach((item) => {
        item.parentNode.removeChild(item);
      });
      icons.forEach((item) => {
        item.parentNode.removeChild(item);
      });
      radios.forEach((item) => {
        if (!item.classList.contains("is-checked")) {
          item.parentNode.removeChild(item);
        } else {
          item.querySelector(".el-radio__label").style.color = "#606266";
        }
      });
      ele.appendChild(form);
      ele.appendChild(textNode);
      new print({
        ids: "print", // * 局部打印必传入id
        standard: "", // 文档类型，默认是html5，可选 html5，loose，strict
        extraHead: "", // 附加在head标签上的额外标签,使用逗号分隔
        extraCss: "", // 额外的css连接，多个逗号分开
        popTitle: "", // title的标题
        endCallback() {
          // 调用打印之后的回调事件
          ele.innerHTML = "";
          ele = null;
        },
      });
    },
    uploadFile() {
      this.$refs.fileUpload.fileSelct();
    },
    // 切换消息类型
    handelSwitchChange(ind, item) {
      this.activeIn = ind;
      this.linkTo(item.path);
    },
    linkTo(name, query) {
      this.$router.linkTo(name, query ? query : null);
    },
  },
};
</script>
<style lang="scss" scoped>
.add-btn {
  color: white;
  background: #fc3e3e;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  cursor: pointer;
}
.pd ::v-deep {
  .el-input__suffix {
    top: 9px;
    right: 10px;
  }
}
//自定义表格
.table-box1 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  border-color: #fc3e3e;
  border-collapse: collapse;
  tr,
  td {
    border: 1px solid #fc3e3e;
    padding-left: 6px;
  }
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
.el-form-box ::v-deep {
  .el-form-item__label {
    color: #fc3e3e;
  }
  .el-input__inner {
    border: none;
  }
}
.add-img {
  width: 20px;
  margin-top: 10px;
  margin-right: 6px;
}
.left-box {
  width: 59.4%;
  top: 0px;
  bottom: 0px;
  left: 0px;
}
.right-box {
  width: 40%;
  top: 0px;
  bottom: 0px;
  right: 0px;
}
</style>
