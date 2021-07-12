<template>
  <div class="h-100 w-100 bg-secondary table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <n-dialog
      ref="dialog"
      :diaTit="'操作行为'"
      :diaWidth="'25%'"
      :isForm="true"
    >
      <template slot="diaSlot">
        <el-form
          class="el-form-box-dialog heiall disi marauto mgl20"
          inline
          :model="ruleformlayer"
        >
          <el-form-item class="wall">
            <span class="grey2 disi label-l">功能名称：</span>
            <el-input
              class="input-m"
              v-model="ruleformlayer.basis_action_chn"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="wall">
            <span class="grey2 disi label-l">英文名称：</span>
            <el-input
              class="input-m"
              v-model="ruleformlayer.basis_action_eng"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="d-flex justify-content-end mb-08">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFunLayer"
          ></n-button>
        </div>
      </template>
    </n-dialog>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll>
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long must" label="功能名称：">
            <el-input
              class="input-m"
              v-model="ruleform.basis_chn"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long must" label="英文名称：">
            <el-input
              class="input-m"
              v-model="ruleform.basis_eng"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="操作行为：">
            <div class="d-inline-block add-circle-btn" @click="addBlock">+</div>
            <el-checkbox-group
              v-model="ruleform.action_list"
              class="checkbox-group-box mt-2"
            >
              <div
                v-for="(active, i) in actives"
                :key="i"
                class="active-box d-inline-block"
              >
                <el-checkbox :label="active">
                  {{ active.basis_action_chn }}(
                  {{ active.basis_action_eng }}
                  )
                </el-checkbox>
                <i
                  @click.stop="editactive(i)"
                  class="iconfont btn-btn_list_edit edit-icon-btn ml-2"
                ></i>
                <i
                  @click.stop="deleteActive(i)"
                  class="
                    iconfont
                    btn-btn_list_trash
                    trash-icon-btn
                    ml-2
                    table-trash-icon
                  "
                ></i>
              </div>
            </el-checkbox-group>
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
export default {
  mixins: [confirm],
  data() {
    return {
      ruleform: {
        basis_chn: "",
        basis_eng: "",
        action_list: [],
      },
      rules: {
        basis_chn: [
          {
            required: true,
            message: "请输入功能名称",
          },
        ],
        basis_eng: [
          {
            required: true,
            message: "请输入英文名称",
          },
        ],
      },
      ruleformlayer: {
        basis_action_chn: "",
        basis_action_eng: "",
      },
      actives: [
        {
          basis_action_chn: "不可见",
          basis_action_eng: "invisible",
        },
        {
          basis_action_chn: "查看",
          basis_action_eng: "query",
        },
        {
          basis_action_chn: "上报",
          basis_action_eng: "upload",
        },
        {
          basis_action_chn: "修改",
          basis_action_eng: "update",
        },

        {
          basis_action_chn: "删除",
          basis_action_eng: "delete",
        },
        {
          basis_action_chn: "导入",
          basis_action_eng: "import",
        },
        {
          basis_action_chn: "导出",
          basis_action_eng: "export",
        },
      ],
      checkList: [],
      modifyflag: null,
      examine_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
    };
  },
  created() {
    if (!isNaN(this.examine_id)) {
      this.queryBasis();
    }
  },
  computed: {
    title() {
      return isNaN(this.examine_id) ? "新增基础模块" : "编辑基础模块";
    },
  },
  methods: {
    async queryBasis() {
      let res = await api.queryBasisAndAction({
        basis_id: this.examine_id,
      });
      if (!res) {
        return;
      }
      if (res.result.length > 0) {
        const json = ["basis_chn", "basis_eng", "action_list"];
        let list = res.result[0].action_list;
        for (let i in list) {
          let index = this.findactive(list[i].basis_action_eng);
          if (index < 0) {
            this.actives.push(list[i]);
          } else {
            this.actives[index] = list[i];
          }
        }

        this.$utils.renderRuleForm(this, json, this.ruleform, res.result[0]);
      }
    },
    findactive(eng) {
      return this.actives.findIndex((item) => item.basis_action_eng == eng);
    },
    // 操作行为点击加号
    addBlock() {
      this.ruleformlayer.basis_action_chn = "";
      this.ruleformlayer.basis_action_eng = "";
      this.$refs.dialog.show(); //显示弹框
    },
    // 编辑操作
    editactive(i) {
      this.ruleformlayer.basis_action_chn = "";
      this.ruleformlayer.basis_action_eng = "";
      this.ruleformlayer.basis_action_chn = this.actives[i].basis_action_chn;
      this.ruleformlayer.basis_action_eng = this.actives[i].basis_action_eng;
      this.modifyflag = i;
      this.$refs.dialog.show();
    },
    // 确认提交
    async submitFun() {
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (isNaN(this.examine_id)) {
        await api.uploadBasisAndAction(this.ruleform);
      } else {
        await api.updateBasisAndAction({
          ...this.ruleform,
          basis_id: this.examine_id,
        });
      }
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.go(-1);
        },
      });
    },
    //操作行为新增
    submitFunLayer() {
      if (
        this.ruleformlayer.basis_action_chn == "" ||
        this.ruleformlayer.basis_action_eng == ""
      ) {
        return;
      }
      if (!this.modifyflag) {
        this.actives.push({
          basis_action_chn: this.ruleformlayer.basis_action_chn,
          basis_action_eng: this.ruleformlayer.basis_action_eng,
        });
      } else {
        this.actives[this.modifyflag].basis_action_chn =
          this.ruleformlayer.basis_action_chn;
        this.actives[this.modifyflag].basis_action_eng =
          this.ruleformlayer.basis_action_eng;
        this.modifyflag = null;
      }
      this.$refs.dialog.cancel(); //显示弹框
      this.ruleformlayer.basis_action_chn = "";
      this.ruleformlayer.basis_action_eng = "";
    },
    deleteActive(i) {
      let index = this.ruleform.action_list.findIndex(
        (item) => item.basis_action_eng == this.actives[i].basis_action_eng
      );
      if (index >= 0) {
        this.ruleform.action_list.splice(index, 1);
      }
      this.actives.splice(i, 1);
    },
  },
};
</script>
<style scoped lang="scss">
.checkbox-group-box {
  width: 700px;
  .active-box {
    width: 350px;
    margin-top: 10px;
    margin-right: 0;
    padding-right: 10px;
  }
}
</style>
