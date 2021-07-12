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
          ref="chooseperson"
          :section="ruleform.organ_id_union"
          :personIDsArr="personIDsArr"
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
          <el-form-item class="form-item-long-small must" label="角色名称：">
            <el-input placeholder="请输入" v-model="ruleform.role"> </el-input>
          </el-form-item>
          <br />
          <el-form-item
            class="form-item-long-small must form-item-long-height"
            label="是否启用："
          >
            <el-switch v-model="roleStaus"></el-switch>
          </el-form-item>
          <br />

          <el-form-item class="form-item-long-small must" label="所属部门：">
            <n-treeselect
              ref="treeselect"
              @getSelectNode="getSelectValue"
              :treeData="treeData"
              :is_pos="true"
              :Isvalue="true"
              :value="ruleform.organ_id_union"
            />
          </el-form-item>
          <br />
          <el-form-item class="form-item-long-small" label="角色描述：">
            <el-input
              type="textarea"
              placeholder="请输入"
              rows="6"
              v-model="ruleform.role_desc"
            ></el-input>
          </el-form-item>
          <br />
          <el-form-item
            class="form-item-long-small must form-item-long-height"
            label="授权人员："
          >
            <!-- <el-radio-group v-model="accesstype" class="el-radio-form">
              <el-radio :label="1">所有人员</el-radio>
              <el-radio :label="2">指定人员</el-radio>
            </el-radio-group>
            <template v-if="accesstype == 2"> -->
            <nAddItemContent @addFun="addPersons">
              <template slot="content-add">
                <div
                  class="content-item"
                  v-for="(item, index) in personList"
                  :key="index"
                >
                  <span>{{ item.account_name }}【{{ item.account_job }}】</span>
                  <i
                    class="iconfont btn-btn_detail_minus_02 font-20"
                    @click="reduceFun(index, item)"
                  ></i>
                </div>
              </template>
            </nAddItemContent>
            <!-- </template> -->
          </el-form-item>
          <div class="clear auth-box h-100">
            <div class="d-flex align-items-center flex-column">
              <div class="w-100">
                <span class="grey2 d-inline-block label-l must">权限分配</span>
              </div>
              <div
                class="w-100 flex-fill cuk mt-1"
                style="padding-bottom: 40px; overflow: hidden"
              >
                <table class="cuk-table w-100">
                  <thead>
                    <tr>
                      <th class="p" style="min-width: 100px">模块</th>
                      <th class="p" style="min-width: 100px">操作模块</th>
                      <th class="p" style="min-width: 100px">禁止访问</th>
                      <th class="p" style="min-width: 100px">权限</th>
                      <th class="p text-left" style="min-width: 100px">
                        <el-checkbox-group
                          v-model="changeListAll"
                          @change="() => changeAll()"
                        >
                          <el-checkbox label="1">全选</el-checkbox>
                        </el-checkbox-group>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-left">
                    <tr
                      v-for="(item, i) in authArr"
                      :key="i + 'au'"
                      :class="colorArr[item.module_parent_top]"
                    >
                      <td
                        class="text-center p"
                        style="min-width: 100px"
                        v-if="
                          rootNameNumber[item.module_parent_top] - i ==
                          rootName[item.module_parent_top]
                        "
                        :rowspan="rootName[item.module_parent_top]"
                      >
                        {{ item.module_parent_top }}
                      </td>
                      <td class="text-left p">
                        {{ item.module_all_parent_Mid }}
                      </td>
                      <td style="min-width: 100px">
                        <div class="text-left p">
                          <el-checkbox-group
                            v-if="
                              item.action_invisible_detail_list &&
                              item.action_invisible_detail_list.length
                            "
                            v-model="changedis[i]"
                            @change="changedisArr(i)"
                          >
                            <el-checkbox
                              v-for="(
                                inv, index
                              ) in item.action_invisible_detail_list"
                              :key="index + 'inv'"
                              :label="inv.relation_id"
                              >不可见</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                      </td>
                      <td>
                        <div class="text-left p" style="width: auto">
                          <el-checkbox-group
                            v-if="item.action_id_list"
                            style="float: left"
                            v-model="checkList[i]"
                            @change="
                              changeCheckList(
                                1,
                                i,
                                item.action_id_list.join(',')
                              )
                            "
                          >
                            <el-checkbox
                              v-for="(act, index) in item.action_detail_list"
                              :key="index + 'au'"
                              :label="act.relation_id"
                              >{{ act.module_chn }}</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                      </td>

                      <td>
                        <div class="text-left p" style="min-width: 100px">
                          <el-checkbox-group
                            v-model="checkall[i]"
                            v-if="item.action_id_list"
                            @change="
                              changeCheckList(
                                2,
                                i,
                                item.action_id_list.join(',')
                              )
                            "
                          >
                            <el-checkbox
                              :label="item.action_id_list.join(',') + ''"
                              >全选</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
      title: "",
      ruleform: {
        organ_id_union: null,
        role_type: 2,
        role: "",
        role_desc: "",
        role_staus: 1, // 角色状态:1启用,2关闭 \
        role_accounts: "*", // 角色的账户id,以逗号分隔
        role_access_modules: "",
      },
      checkList: [],
      checkall: [],
      changedis: [],
      // accesstype: 2, // 1 所有人员，2 选择人员
      roleStaus: true, // 角色状态:true启用,false关闭
      manager: "",
      radio: false,
      personList: [],
      personIDsArr: [],
      changeListAll: [],
      role_id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的id
      authArr: [],
      treeData: [],
      rules: {
        role: [
          {
            required: true,
            message: "请填写角色名称",
          },
        ],
        organ_id_union: [
          {
            required: true,
            message: "请选择角色的所属机构",
          },
        ],
        role_accounts: [
          {
            required: true,
            message: "请选择授权人员",
          },
        ],
        role_access_modules: [
          {
            required: true,
            message: "请选择功能模块",
          },
        ],
      },
      rootName: {},
      rootNameNumber: {},
      colorArr: {},
    };
  },
  watch: {
    roleStaus(staus) {
      if (staus) {
        this.ruleform.role_staus = 1;
      } else {
        this.ruleform.role_staus = 2;
      }
    },
  },
  async created() {
    await this.getTreeData();
    if (this.$route.query.id) {
      this.title = "编辑权限";
    } else {
      this.title = "新增权限";
    }
    if (this.role_id) {
      await this.queryRole();
    } else {
      await this.queryRoleAction();
    }
  },
  methods: {
    // 查询公司/项目属性的结构
    async getTreeData() {
      let { result } = await api.queryOrganTree({
        organ_node: this.$organ_id_en_or_pro(this),
        // organ_type_node: "30,20",
      });
      this.treeData = result;
    },
    getSelectValue(node) {
      this.ruleform.organ_id_union = node.tag;
    },
    async queryRoleAction() {
      let res = await api.queryActionRelation({});
      let setName = new Set(),
        setAllName = [];
      res.result.forEach((item) => {
        setAllName.push(item.module_parent_top);
        setName.add(item.module_parent_top);
      });
      let obj = {};
      for (var i = 0, l = setAllName.length; i < l; i++) {
        var item = setAllName[i];
        obj[item] = obj[item] + 1 || 1;
      }
      let sum = 0;
      let obj2 = {},
        arr = Array.from(setName),
        arr2 = [];
      for (let i in arr) {
        sum += obj[arr[i]];
        obj2[arr[i]] = sum;
        // arr2.push(...res.result.filter(item=> item.module_parent_top == arr[i]))
        if (i % 2 == 0) {
          this.colorArr[arr[i]] = "color1";
        } else {
          this.colorArr[arr[i]] = "color2";
        }
      }
      this.rootName = obj;
      this.rootNameNumber = obj2;
      this.checkall = res.result.map(() => []);
      this.checkList = res.result.map(() => []);
      this.changedis = res.result.map(() => []);
      this.authArr = res.result;
    },
    // 权限选择
    changeCheckList(type, i, val) {
      // if(this.checkList[i].join(",") == this.checkall[i].join(",")){
      //   return;
      // }
      let arr = val.split(",");
      if (type == 1) {
        if (this.checkList[i].length == arr.length) {
          this.$set(this.checkall, i, [val]);
          let flag = this.checkall.findIndex((item) => {
            return item[0] == "" || item[0] == undefined;
          });
          if (flag < 0) {
            this.$set(this.changeListAll, 0, "1");
          }
        } else {
          this.$set(this.checkall, i, []);
          this.changeListAll = [];
        }
      } else {
        if (this.checkall[i].length > 0) {
          this.$set(
            this.checkList,
            i,
            arr.map((item) => Number(item))
          );
          let flag = this.checkall.findIndex((item) => {
            return item[0] == "" || item[0] == undefined;
          });
          if (flag < 0) {
            this.$set(this.changeListAll, 0, "1");
          }
        } else {
          this.$set(this.checkList, i, []);
          this.changeListAll = [];
        }
      }

      if (this.checkList[i].length >= 1) {
        this.$set(this.changedis, i, []);
      }
    },
    changedisArr(i) {
      if (this.changedis[i].length == 1) {
        this.$set(this.checkList, i, []);
        this.$set(this.checkall, i, []);
        this.changeListAll = [];
      }
    },
    // 全选
    changeAll() {
      if (this.changeListAll[0] == 1) {
        this.checkall = this.authArr.map((item) => [
          item.action_id_list.join(","),
        ]);
        this.checkList = this.authArr.map((item) => [...item.action_id_list]);
        this.changedis = this.authArr.map(() => []);
      } else {
        this.checkList = this.authArr.map(() => []);
        this.checkall = this.authArr.map(() => []);
      }
    },
    dialogClose() {
      this.$refs.chooseperson.choosePersonIDsArr = this.personIDsArr;
    },
    // 编辑时查询角色信息
    async queryRole() {
      let res = await api.queryRole({
        role_id: this.role_id,
      });
      let info = res.result[0];
      if (info) {
        for (let key in this.ruleform) {
          this.ruleform[key] = info[key];
        }
        this.roleStaus = this.ruleform.role_staus == 1;
        this.personIDsArr = this.ruleform.role_accounts.split(",").map(Number);
        await this.queryAccount(this.personIDsArr);
      }
      // if (res.result.length > 0) {
      // 当授权人员为所有人员时
      // if (this.ruleform.role_accounts == '*') {
      //   this.accesstype = 1;
      // } else {
      //   this.accesstype = 2;
      //   this.personIDsArr = this.ruleform.role_accounts.split(',').map(Number);
      //   await this.queryAccount(this.personIDsArr);
      // }
      // }
      await this.queryRoleAction();
      let auths = await api.queryRoleAction({
        role_id: this.role_id,
        account_id: this.personIDsArr[0],
      });
      auths.result.forEach((ele) => {
        let index = this.authArr.findIndex(
          (item) => item.module_parent_id == ele.module_parent_id
        );
        if (index > -1) {
          this.$set(
            this.changedis,
            index,
            this.$utils.unique(
              ele.action_invisible_detail_list.map((item) => item.relation_id)
            )
          );
          this.$set(
            this.checkList,
            index,
            this.$utils.unique(
              ele.action_detail_list.map((item) => item.relation_id)
            )
          );
          if (
            this.checkList[index].length ==
            this.authArr[index].action_id_list.length
          ) {
            this.$set(this.checkall, index, [
              this.authArr[index].action_id_list.join(","),
            ]);
          }
        }
      });
      let flag = this.checkList.findIndex((item) => item.length == 0);
      if (flag < 0) {
        // this.changeListAll[0] = "1";
        this.$set(this.changeListAll, 0, "1");
      }
    },
    // 点击➕展示人员选择弹框
    addPersons() {
      this.$refs.dialog.show();
      if (this.$refs.chooseperson) {
        this.$refs.chooseperson.setSelectPerson(this.personList);
      } else {
        this.$nextTick(() => {
          this.$refs.chooseperson.setSelectPerson(this.personList);
        });
      }
    },
    // 查询人员
    async queryAccount(arr) {
      let data = await api.queryAccount({
        account_ids: arr.join(","),
      });
      this.personList = data.result;
    },
    // 删除人员
    reduceFun(ind, data) {
      this.personList.splice(ind, 1);
      let indID = this.personIDsArr.indexOf(data.account_id);
      this.personIDsArr.splice(indID, 1);
    },
    choosePersonNodes(nodes) {
      this.personIDsArr = nodes.map((item) => item.account_id);
      this.personList = [...nodes];
      this.$refs.dialog.cancel();
    },
    // 确认提交
    async submitFun() {
      this.ruleform.role_access_modules = this.checkList.join(",");
      this.ruleform.role_accounts =
        this.accesstype == 1 ? "*" : this.personIDsArr.join(",");
      let arr = this.checkList.join(",").split(","),
        arr1 = this.changedis.join(",").split(",");
      let module = Array.from(new Set([...arr1, ...arr]));
      this.ruleform.role_access_modules = module
        .filter((item) => item != "")
        .join(",");
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      if (!this.role_id) {
        await api.uploadRole(this.ruleform);
        this.$tip({
          isTip: false,
          closeTime: 1000,
          func: () => {
            this.$router.go(-1);
          },
        });
      } else {
        await api.updateRole({
          ...this.ruleform,
          role_id: this.role_id,
        });

        let role_accounts = this.ruleform.role_accounts.split(",").map(Number);
        if (
          role_accounts.indexOf(Number(this.$store.getters.account_id)) != -1
        ) {
          this.$tip({
            isTip: false,
            closeTime: 500,
          });
          setTimeout(() => {
            alert("您的权限已被更新，请重新登录");
            this.$store.dispatch("user/loginOut");
            this.$router.linkTo("login");
          }, 1000);
        } else {
          this.$tip({
            isTip: false,
            closeTime: 1000,
            func: () => {
              this.$router.go(-1);
            },
          });
        }
      }
    },
  },
};
</script>
<style lang="scss">
.input-append-add {
  .el-input-group__append {
    padding: 0 10px !important;
  }
}

.authconfig {
  .n-scroll__wrap {
    .n-scroll__view {
      height: 100% !important;
    }
  }
}
</style>
<style scoped lang="scss">
.auth-box {
  justify-items: baseline;
  align-items: baseline;
}
.cuk-table th {
  font-weight: 700;
  background: #dadfe6;
  border-top: 1px solid #dadfe6;
  color: #202d40;
  border-right: 1px solid #fff;
}
.color1 {
  background-color: #fff;
}
.color2 {
  background-color: #f5f7fa;
}
.root-td {
  color: #fff;
  border: 1px solid #fff;
  background: #406de0;
}
// .cuk-table tr {
//   background-color: #fff;
// }
// .cuk-table tr:nth-child(2n) {
//   background-color: #f5f7fa;
// }
.access-person {
  .access-personlist {
    height: 150px;
    width: 500px;
    border-radius: 12px;
    overflow: hidden;

    .access-choose-main {
      width: 430px;
    }

    .accessible-add {
      background: #d5e2fc;
      right: 0;
      top: 0;

      img {
        width: 30px;
      }
    }
  }
}
</style>
