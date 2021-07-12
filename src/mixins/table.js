import api from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      deleData: {},
      infoData: {},
      currentPage: 1,
      totalcount: 0,
      listLoading: false,
      getListBool: true, //是否执行mixin里面的列表请求getList();默认执行
      selectionArr: [], //表格选中的项
      tableSelectList: [],//所有选中的数据，根据页码的一个二维数组
    };
  },
  activated() {
    this.tableSelectList = [];
    if (this.getListBool) {
      this.getList();
    }
  },
  mounted() {
    if (
      this.getListBool &&
      !this.$route.meta.keepAlive &&
      !this.$route.meta.needAlive &&
      !this.$route.meta.secondAlive
    ) {
      this.getList();
    }
  },
  methods: {
    search() {
      this.currentPage = 1;
      this.getList();
    },
    // 表格选项selection-change事件
    // 通过当前分页的页码，给当前页选中的值进行赋值
    handleSelectionChange(val) {
      this.tableSelectList[this.listQuery.page] = val;

    },
    tableDefaultSelect() {
      let rows = [];     //先定义一个选中行的数组
      if (JSON.stringify(this.tableSelectList) !== '[]') {     //先判定是否有值 
        let arr = this.tableSelectList.flat();
        for (let i in arr) {
          if (this.tableData.findIndex(x => x[this.keyID] === arr[i][this.keyID]) >= 0) {
            rows.push(this.tableData.findIndex(x => x[this.keyID] === arr[i][this.keyID]));
          }
        }
        this.$nextTick(() => {    //等dom更新之后再选中，并且表格一定要设置ref
          if (rows) {
            rows.forEach(row => {
              this.$refs.table.toggleRowSelection(this.tableData[row]);
            })
          }
        });
      }
    },
    // 根据选中项批量导出
    async handleExportFromSelected(urlName, idKey, conditions, fileName) {
      let arr = this.tableSelectList.flat();
      const idList = [];
      arr.forEach(item => {
        idList.push(item[idKey])
      })
      let requestData = {
        [idKey + "s"]: idList.join(',')
      }
      requestData = Object.assign({}, requestData, conditions, { page: -1 })
      const res = await api[urlName](requestData)
      this.$utils.downloadfile(res.result[0].url, fileName)
    },
    changePage(page) {
      this.currentPage = page;
      this.getList();
    },
    // 请求表格数据
    async getList() {
      // if (!this.isHidePage) {
      //   this.$router.push({
      //     query: { ...this.$route.query, page: this.currentPage }
      //   });
      // }
      if (!this.postURL) {
        return;
      }
      this.listQuery.page = this.listQuery.page == -1 ? -1 : this.currentPage - 1;
      this.listLoading = true;
      let data = await api[this.postURL]({ ...this.listQuerys, ...this.listQuery });
      this.tableData = data.result;
      this.totalcount = data.total_count;
      this.listLoading = false;
      document.getElementsByClassName("el-table__body-wrapper")[0]
        ? (document.getElementsByClassName("el-table__body-wrapper")[0].scrollTop = 0)
        : (document.getElementsByClassName("el-scrollbar__wrap")[0].scrollTop = 0);
      // 跨页删除若把最后一页删除完了,则需要查询当前最后一页的前一页的数据
      if (this.tableData.length == 0 && data.total_count != 0) {
        this.currentPage = this.currentPage - 1;
        this.getList();
      }
      // 避免表格合计不显示的问题
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout();
      });
      //调用接口拉取到数据之后再调用渲染默认值的方法
      this.tableDefaultSelect();
    },
    // 点击表格行
    rowclick(row) {
      this.$refs.detailDialog.show();
      this.infoData = row;
    },
    deleteFun(bool, row, delKeyName, delUrlName, callback, params, beforeDel) {
      let selectionArr = this.tableSelectList.flat();
      if (bool) {
        //批量删除
        if (beforeDel) {
          return;
        }
        let del_ids = [];
        if (selectionArr.length > 0) {
          selectionArr.forEach(ele => {
            del_ids.push(ele[delKeyName]);
          });
          this.confirm().then(async () => {
            this.deleData[delKeyName] = null;
            this.deleData[delKeyName + "s"] = del_ids.join(",");
            await this.sureDelete(delUrlName, () => { }, selectionArr, params);
            callback && callback();
          });
        } else {
          this.$tip({
            isTip: true,
            message: `请勾选要删除的项`,
          });
        }
      } else {
        this.confirm().then(async () => {
          this.deleData[delKeyName + "s"] = "";
          this.deleData[delKeyName] = row[delKeyName];
          await this.sureDelete(delUrlName, () => { }, selectionArr, params);
          callback && callback();
        });
      }
    },
    // 表格确认删除
    async sureDelete(url, fun, selectionArr = [], params) {
      await api[url]({ ...this.deleData, ...params });
      if (selectionArr.length == this.tableData.length) {
        this.currentPage = this.currentPage - 1 == 0 ? 1 : this.currentPage - 1;
      } else {
        this.currentPage =
          this.tableData.length == 1 ? (this.currentPage - 1 == 0 ? 1 : this.currentPage - 1) : this.currentPage;
      }
      this.tableSelectList = [];
      this.getList(); //重新获取列表数据
      if (typeof fun == "function") {
        fun();
      }
    },
    async handleExportClick() {
      let res = await api[this.exportUrl](this.listQuery);
      let url = res.result[0].url;
      let anchor = document.createElement("a");
      anchor.href = url;
      anchor.click();
    },
    // 筛选条件后重新请求数据
    refreshData() {
      this.currentPage = 1;
      this.getList();
    },
  },
};
