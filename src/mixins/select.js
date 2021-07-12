
export default {
  data() {
    return {
      selectionArr: [], //表格选中的项
    };
  },
  methods: {
    selectionChoose(name, tipText, fun) {
      if (this.selectionArr.length > 0) {
        let chooseids = [];
        this.selectionArr.forEach(ele => {
          chooseids.push(ele[name]);
        });
        fun(chooseids);

      } else {
        this.$tip({
          isTip: true,
          message: `请勾选要${tipText}的项`
        });
      }
    }
  }
};
