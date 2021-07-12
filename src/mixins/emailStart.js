/*
 * @Autor: 邓易
 * @Date: 2021-03-22 11:01:02
 * @LastEditors: 邓易
 * @LastEditTime: 2021-03-22 11:10:14
 */
export default {
  methods: {
    changeStrt(del_type, id) {
      this.confirm("", "", "是否确认操作").then(async () => {
        this.deleData.email_ids = String(id);
        this.deleData.del_type = del_type;
        await api.DelOaEmail(this.deleData);
        this.refreshData();
        this.$bus.$emit("refresh_email", "");
      });
    },
  },
};
