<template>
  <div class="container-all">
    <div class="rounded-1 bg-secondary pl-2">
      <nBackTop title="申请管理" />
    </div>
    <div class="container-div p-2">
      <n-scroll>
        <div v-for="(item, index) in ayypyArr" :key="index" class="mb-2">
          <div class="d-flex align-items-center">
            <span class="column-line"></span>
            <span class="font-14 font-weight-bold ml-1">{{ item.name }}</span>
          </div>
          <div class="d-flex flex-wrap pt-2">
            <template v-for="(itm, ind) in item.num">
              <div
                v-permission="[GLOBAL.applyArr[ind + item.index].permission]"
                :key="ind"
                class="text-center apply-item mb-2 cursor-p mr-4"
                @click="
                  $router.linkTo(GLOBAL.applyArr[ind + item.index].linkName, {
                    t: GLOBAL.applyArr[ind + item.index].type,
                    auth: GLOBAL.applyArr[ind + item.index].permission,
                  })
                "
              >
                <div
                  class="oa-home-apply-item"
                  :style="{
                    backgroundImage:
                      'url(' + GLOBAL.applyArr[ind + item.index].src + ')',
                  }"
                ></div>
                <p class="text-secondary">
                  {{ GLOBAL.applyArr[ind + item.index].name }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </n-scroll>
    </div>
    <div class="p-1"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ayypyArr: [
        { name: "人事申请", num: 4, index: 0 },
        { name: "行政申请", num: 3, index: 4 },
        { name: "财务申请", num: 2, index: 7 },
        { name: "工会党建申请", num: 5, index: 9 },
        { name: "其他", num: 2, index: 14 },
        { name: "工程管理", num: 3, index: 16 },
        { name: "材料管理", num: 8, index: 19 },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.apply-item {
  text-align: center;
  .oa-home-apply-item {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background-size: 100% 100%;
    img {
      width: 100%;
    }
  }
}
</style>
