/*
 * @Autor: 邓易
 * @Date: 2020-10-19 14:03:53
 * @LastEditors: 邓易
 * @LastEditTime: 2020-11-04 16:28:26
 */
export default {
  methods: {
    /**
     * @author feijiali
     * @description switch开关 点击按钮后，弹窗确认再改变开关状态
     * @param {Object} row  当条数据的内容对象
     * @param {String} value v-modeld值
     * @param {String} text  MessageBox 消息正文内容
     * @param {String} title  MessageBox 标题
     * @param {String} type  消息类型，用于显示图标
     * @returns {Boolean} 打开了按钮返回true，关闭了按钮返回false
     */
    confirm(row, value, message = "确认是否删除？", title = "", type = "") {
      return new Promise((resolve, rejects) => {
        if (value) {
          var flag = row[value]; //保存点击之后v-modeld的值(true，false)
          row[value] = !row[value]; //保持switch点击前的状态
        }
        this.$confirm(message, title, {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: type,
        })
          .then(() => {
            if (value) {
              //说明是操作switch开关
              if (flag) {
                row[value] = true;
                resolve(true);
              } else {
                row[value] = false;
                resolve(false);
              }
            } else {
              resolve();
            }
          })
          .catch(() => {
            rejects();
          });
      });
    },
  },
};
