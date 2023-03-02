<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import "../Widgets/widgets.css";
// 设置默认资源位置
window.CESIUM_BASE_URL = "/";

const terrainConfig = {
  // 默认地形
  default: Cesium.createWorldTerrain({
    // 法相
    requestVertexNormals: true,
    // 水纹
    requestWaterMask: true,
  }),
  // 自定义地形
  custom: new Cesium.CesiumTerrainProvider({
    url: "./terrains/gz",
  }),
};

onMounted(() => {
  // 初始化窗口
  const viewer: any = new Cesium.Viewer("cesiumContainer", {
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
    terrainProvider: terrainConfig.custom,
  });
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
});
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
