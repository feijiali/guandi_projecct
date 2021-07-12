# 项目管家AI-BIM组件使用说明文档

## 组件引用方式
```vue
<template>
  <Model  :path="path"/>
</template>
<script>
  important Model from "xxx/Model"
  export defalut {
    components:{
      Model
    }，
    data(){
    	return{
            isAdvancedGeology: false,
            path: ['/project/bim', '/project/advancedGeology']
    	}
    }
  }
</script>
```
> `path`是要显示bim的路由路径
> 使用`isAdvancedGeology`来判断当前页面是否超前地质预报
## 组件结构说明
```
.
|-- Mixins
|   |-- bimUtils.js bim bim 回调集合
|   |-- processTotal.js 全线统计弹窗 请求方法
|   |-- scene.js 桥梁 隧道 进入后的回调方法
|   `-- tools.js canvas 圆形统计图 方法
|-- README.md 说明文档
|-- components
|   |-- Layer 弹窗目录
|   |   |-- ProgressArr.vue 全线统计
|   |   |-- QualityInspection.vue 质量巡检弹窗
|   |   `-- SafeInspection.vue 安全巡检弹窗
|   |-- LeftSilder 左侧面板
|   |   |-- BridgeTotal.vue 桥梁统计
|   |   |-- TunnelTotal.vue 隧道统计
|   |   `-- UnitProjectList.vue 全线单元工程选择
|   |-- Loading.vue bim加载动画
|   `-- RightSider 右侧面板
|       |-- BridgeLog.vue 桥梁日志
|       `-- TunnelLog.vue 隧道日志
|-- images 图片
|   |-- bim_loading_bg.png
|   |-- bim_loading_fg.png
|   `-- bim_loading_logo.png
`-- index.vue
```

## 组件依赖

需要在`index.html`中引入bim资源和bim通信方法的实现：

```html
<script src="./static/Build/UnityLoader.js"></script>
<script type="text/javascript" src="./static/js/APIUtility.js"></script>
<script type="text/javascript" src="./static/js/index.js"></script>
```

文件说明：

- `UnityLoader.js`bim资源文件

  通过声明一个`UnityLoader`对象，来暴露bim的方法。

  ```js
  var UnityLoader = UnityLoader || (function(){...})()
  ```

  

- `APIUtility.js`和`index.js`

  主要是负责bim的通信方法注册，初始化和回调方法。

## 初始化bim步骤说明
1. 当model组件挂载时会向window注入一个属性`model`，此属性为组件的实例（指向model组件的this）。
2. 调用`APIUtility.js`中的`APIUtility.initBim`方法，初始化bim，提示开始加载动画。
3. 当bim加载完成，回调`index.js`中的`setServeType`方法，该方法调用model中的`settingServer`方法，设置bim的用户资源，同时
4. 当资源设置完成后，bim回调model中的`initializeSuccees`方法
	```JS
	initializeSuccees() {
	    if (this.isAdvancedGeology) {
	        // 如果是超前地质预报,通知超前地质预报bim加载完成
	        this.$bus.$emit('advancedComplete');
	    } else {
	        //  如果是不是，进入全线
	        this.advanced = false;
	        APIUtility.SendCommand(APIUtility.APICommand.InitializeGIS, 0, this);
	    }
	    // 获取 单位工程列表
	    this.getProjectList();
	}
	```
> 超前地质预报进入隧道后会将`advanced`变成`true`


5. 进入全线后，bim回调`changeSceneType`,和`bimCompeleted`方法。

   `changeSceneType`方法记录当前进入的是什么场景（全线、桥梁、隧道等）

   `bimCompeleted`方法会关闭动画,展示全线面板。
   至此bim初始化完成。

## 进入桥梁场景步骤

1. 点击bim中的桥梁面板
2. `changeSceneType`方法通知进入桥梁，关闭单位工程选择面板
3. 桥梁加载完成，回调`bridgeCompleted `。显示桥梁统计和日志面板

## 进入隧道场景步骤

1. 点击bim中的桥梁面板
2. `changeSceneType`方法通知进入隧道，关闭单位工程选择面板
3. 桥梁加载完成，回调`tunnelCompleted`。显示隧道统计和日志面板

## 进入超前地质预报

进入超前地质预报有两种步骤

- 直接进入超前地质预报页面

  1）在地质预报页面监听方法

  ```js
  this.$bus.$on('advancedComplete',()=>{
      ...
      // switchProject 方法会调用setProject
      this.switchProject()
      ...
  })
  ```

  2) 查询当前项目，调用model中的`setProject`方法设置当前项目资源

  ```js
  window.bim_model.setProject(this.project);
  ```

  3) `bimCompeleted`阶段，监听`advancedSwicth`,进入地质预报的隧道场景

  ```js
  this.$bus.$on('`advancedSwicth`',()=>{
      APIUtility.SendCommand(
          APIUtility.APICommand.InitTunnelPrediction,
          subUnit.sub_unit_tag,
          this
      );
  })
  ```

  4) 进入场景后`bim`回调`model`中的`InitTunnelPrediction`方法，然后地质预报监听到方法，通知bim显示预警的桩号

  ```js
  // bimUtils.js
  InitTunnelPrediction() {
      if (this.isAdvancedGeology) {
          this.$bus.$emit('advancedSwicthEnd');
      }
  }
  
  // 超前地质预报页面 
  this.$bus.$on('advancedSwicthEnd', () => {
      // 显示预警的桩号
  })
  ```

- 先点击bim+gis页面进入全线后，再进入超前地质预报

  进入超前地质预报页面后，model组件中早已初始化完成，所以直接就可以进入地质隧道的场景

  ```js
  activated() {
     // 获取单位工程
     this.getProjectList();
  }
  getProjectList(){
      ...
      // switchProject 方法会调用setProject
      this.switchProject()
      ...
  }
  ```

  之后的步骤，和上面直接进入地质页面的相同。

  > `switchProject`方法中会判断bim是否初始化完成，完成就执行方法。
