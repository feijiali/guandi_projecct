<template>
  <div v-if="item">
    <mlCircle :map="map" :item="item" :option="ciroption" />
    <div class="cirview">
      <div ref="infoView" class="cirinfoview bg-white posr wrap">
        <el-form class="el-form-box heiall flexsta" :model="ruleform">
          <el-form-item>
           <div class="flexsta">
             <span class="grey2 disi label-l must">半径范围：</span>
             <el-input type="number" placeholder="请输入" class="input-m" v-model="ruleform.radius"></el-input>
             <div @click="submitFun" class="confirm-btn common-btn">确认提交</div>
           </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import mlCircle from "@/components/MapComponents/mlCircle";
  import api from "@/api/index";
  export default {
    props: ["map", "item", "type"],
    data() {
      return {
        ruleform: {
          radius: null,
        },
        infoWindow: null,
        rules: {
          radius: [{
            required: true,
            message: "请输入半径范围"
          }],
        },
        ciroption: {
          option: {
            fillColor: "#ffc474", // 圆形填充颜色
            fillOpacity: 0.5, // 圆形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
            strokeColor: "#fea632", // 描边颜色
            strokeWeight: 2 // 描边宽度
          },
        }
      }
    },
    components: {
      mlCircle
    },
    created() {},
    watch:{
      'item.pos':function(){
        if(this.type && this.type==1){
          this.showsub()
        }
      }
    },
    mounted() {
      this.infoWindow = new AMap.InfoWindow({
        content: this.$refs.infoView,
        offset: new AMap.Pixel(0, 0)
      });
      if(this.type && this.type==1){
        this.showsub()
      }
    },
    methods: {
      showsub() {
        this.infoWindow.open(this.map, new AMap.LngLat(...this.item.pos));
        //this.$router.linkTo( "EquipmentTrack")
      },
      submitFun() {

      },
      back() {

      }
    },
    beforeDestroy(){
      this.infoWindow.close()
    }
  }
</script>

<style lang="scss">
  .cirview {
    display: none;
  }
  .cirinfoview{
    padding-top: 10px;
    margin-bottom: -10px;
    .common-btn{
      margin-left: 5px;
      width: 100px;
      padding: 12px 12px;
    }
    .input-m{
      width: 120px;
    }
    .label-l{
      width: 80px;
    }
  }
</style>
