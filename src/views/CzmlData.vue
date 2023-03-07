<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>

  <div class="btn-group">
    <div class="btn" @click="setView(viewer, postion)">指定视角{{}}</div>
    <div class="btn" @click="flyView(viewer, postion)">飞行前往指定视角</div>
    <div class="btn" @click="fwFn('w')">上</div>
    <div class="btn" @click="fwFn('s')">下</div>
    <div class="btn" @click="fwFn('a')">左</div>
    <div class="btn" @click="fwFn('d')">右</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import "../Widgets/widgets.css";
// 设置默认资源位置
window.CESIUM_BASE_URL = "/";
let viewer: Cesium.Viewer;
// 天安门
const postion = Cesium.Cartesian3.fromDegrees(116.392428, 39.90923, 500);
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  85.9,
  20.4,
  110.4,
  61.2
);
onMounted(() => {
  // 初始化窗口
  viewer = new Cesium.Viewer("cesiumContainer", {
    // 是否显示信息框
    infoBox: false,
    // 搜索
    geocoder: false,
    // 显示home
    homeButton: false,
    // 场景模式选择2的，3d
    sceneModePicker: false,
    // 设置图层选择器
    baseLayerPicker: false,
    // 帮助按钮
    navigationHelpButton: false,
    // 时间动画
    animation: false,
    // 时间轴
    timeline: false,
    // 地形设置
    terrainProvider: Cesium.createWorldTerrain({
      // 法相
      requestVertexNormals: true,
      // 水纹
      requestWaterMask: true,
    }),
  });
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";

  // 加载kml数据
  // 全球科研所 
  let kmlUrl = "./Assets/facilities.kml";
  // 各个国家Gdp情况
  let kmlUrl1 = "./Assets/gdpPerCapita2008.kmz";
  let kmlDataPromise = Cesium.KmlDataSource.load(kmlUrl1);
  kmlDataPromise.then((dataSocurce) => {
    console.log(dataSocurce);
    viewer.dataSources.add(dataSocurce);
  });
});
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
.btn-group {
  position: absolute;
  display: flex;
  z-index: 2;
}
.btn {
  padding: 8px 16px;
  background: #0062cc;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  margin: 0 10px;
}
</style>
