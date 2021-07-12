<template>

  <detail-layout :iframe="iframe"
                 :queryApi="queryApi"
                 :exportApi="exportApi"
                 :addApi="addApi"></detail-layout>

</template>
<script>

import detailLayout from "../../layouts/detailLayout"
export default {
  components: {
    detailLayout
  },
  data () {
    return {
      iframe: {
        key: "engineering_main_id",
        src: (process.env.NODE_ENV == 'development' ? "../../.." : this.GLOBAL.baseurl + "/web") + "/h5/material/wastage.html",
      },

      queryApi: {
        placeholder: "请输入材料名称及工程部位搜索"
      },
      addApi: {
        url: "enterprise_material2_material_wastage_handle"
      },
      exportApi: {
        permission: [],
        url: "ExportProjectReportEngineeringMain",

        name: '主要材料损耗统计表'
      }
    };
  },
  mounted () {

  }

};
</script>

