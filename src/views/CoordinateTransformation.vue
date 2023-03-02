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

  // 二维屏幕坐标系，二维笛卡尔坐标系 Cartesian2
  // 地理坐标系 wgs-84坐标系 Cartographic类型，通过经纬度，高度
  // 笛卡尔空间直角坐标系 Cartesian3类型

  // 角度转弧度
  const radians = Cesium.Math.toRadians(90);
  console.log("角度转弧度", radians);
  // 弧度转角度
  const degrees = Cesium.Math.toDegrees(2 * Math.PI);
  console.log("弧度转角度", degrees);

  // 经纬度转笛卡尔坐标[参数：经纬度，高度]
  const Cartesian3 = Cesium.Cartesian3.fromDegrees(89.5, 20.4, 10);
  console.log("经纬度转笛卡尔坐标[参数：经纬度，高度]", Cartesian3);

  // 笛卡尔转经纬度
  const cartographic = Cesium.Cartographic.fromCartesian(Cartesian3);
  console.log("笛卡尔转经纬度", cartographic);
});
</script>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
