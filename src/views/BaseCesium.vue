<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import "../Widgets/widgets.css";
// 设置默认资源位置
window.CESIUM_BASE_URL = "/";

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
    // 设置天空盒子
    skyBox: new Cesium.SkyBox({
      sources: {
        positiveX: "./texture/px.png",
        negativeX: "./texture/nx.png",
        positiveY: "./texture/py.png",
        negativeY: "./texture/py.png",
        positiveZ: "./texture/pz.png",
        negativeZ: "./texture/nz.png",
      },
    }),
  });
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 设置默认视角
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    // 西边经度
    85.9,
    // 南部维度
    20.4,
    // 东边经度
    110.4,
    // 北部维度
    61.2
  );
});
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
