<template>
  <div class="pd20 w-100 h-100">
    <iframe :src="urls" frameborder="0" class="w-100 h-100"></iframe>
  </div>
</template>

<script>
import { $encryptDes } from "@/plugins/des";
import axios from "axios";
// 配置API接口地址
const baseURL = {
  guandi_dev: "https://dev.cninct.com/AI",
  guandi: "https://build.cninct.com/AI",
};
const host = baseURL[process.env.VUE_APP_MODE];

// var url = `${host}/organizational/getUserCodeGmoonThree?mobile=15735181873&department_id=1&user_name=%E9%83%91%E8%8C%9C%E8%BD%A9`
let url = "https://cninct.com/sj/organizational/getUserCodeGmoonThree";
// 'https://cninct.com/sj/organizational/getUserCodeGmoonThree?mobile=15735181873&department_id=1&user_name=%E9%83%91%E8%8C%9C%E8%BD%A9'
// 'https://sj.cninct.com/AI/organizational/getUserCodeGmoonThree?mobile=15735181873&department_id=1&user_name=%E9%83%91%E8%8C%9C%E8%BD%A9'

export default {
  data() {
    return {
      urls: "",
    };
  },
  async mounted() {
    const params = {
      mobile: this.$store.getters.account_tel,
      // department_id: this.$store.state.user.user_organ_id,
      department_id: 1,
      user_name: this.$store.getters.userName,
    };
    try {
      const res = await axios.get(url, { params });

      if (res.data.state !== 1) {
        return (this.urls = `${host}/#/NoAuthority?msg=%E6%B7%BB%E5%8A%A0%E5%A4%B1%E8%B4%A5`);
      }

      let code = $encryptDes(this.$store.getters.account_tel, "FDKASFJI");
      code = encodeURIComponent(code);
      this.urls = `${host}/railwayGmoonThree?tel=${code}`;
      // this.urls = `https://cninct.com/sj/railwayGmoonThree?tel=${code}`
    } catch (error) {
      this.urls = `${host}/#/NoAuthority?msg=%E6%B7%BB%E5%8A%A0%E5%A4%B1%E8%B4%A5`;

      console.error("市场扩展接口响应错误", error.message);
    }
  },
};
</script>
