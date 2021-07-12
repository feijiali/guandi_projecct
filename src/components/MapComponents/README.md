## 高德地图方法组件封装

### 使用方法
```html
<template>
<div>
 <!--1 初始化地图  -->
 <amapView :map.sync="map" @complete="complete" >
 <!--2 画点位  -->
 <mlMarket :map="map" :item="market" :option="marketOption" />
 <!--3 画圆  -->
 <mlCircle :map="map" :item="circle" :option="circleOption" />
 <!--4 画线条 -->
 <mlPolyline :map="map" :item="polyline" :option="polylineOption"/>>
 </amapView>
</div>
</template>
<script>
import amapView from "@/components/MapComponents/amapView";
import mlMarket from "@/components/MapComponents/mlMarket";
import mlCircle from "@/components/MapComponents/mlCircle";
import mlPolyline from "@/components/MapComponents/mlPolyline";
export default {
    components: {
    amapView,
    mlMarket,
    mlCircle,
    mlPolyline
  },
  data(){
      return{
          map:null,
          market:{
              pos:[0,0]
          },
          marketOption:{
              // 高德地图market的属性和方法
            option:{
            }，
            events:{

            }
          },
          circle:{
              pos:[0,0],// 经纬度
              scale:30, // 圆半径
          },
          circleOption:{
              // 高德地图circle的属性和方法
              option:{
                  
              },
              events:{

              }
          },
          polyline:{
              path:[]// 经纬度数组
          },
          polylineOption:{
              // 高德地图circle的属性(方法暂时为绑定)
              option:{
                  
              },
          }
      }
  },
  methods:{
      complete(){

      }
  }
}
</script>
```



