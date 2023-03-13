<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
  <div id="mouse-position"></div>
</template>

<script setup lang="ts">
import { initViwer } from "@/cesium/initViewer";
import * as Cesium from "cesium";
import CesiumNavigaion from "cesium-navigation-es6";
import { onMounted, ref } from "vue";
import "../Widgets/widgets.css";
import { MousePosition } from "@/cesium/mousePosition";
import { navigationConfig } from "@/config/navigation";
import { motifyMap } from "@/cesium/MotifyMap";
import { motifyBuding } from "@/cesium/motifyBuding";
import { LightCone } from "@/cesium/LightCone";
import { RectFlyLight } from "@/cesium/RectFlyLight";
import { RoadLightLine } from "@/cesium/RoadLightLine";
import { RadarLight } from "@/cesium/RadarLight";
import { SpreadLight } from "@/cesium/SpreadLoght";
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MTBjOTQzNC03NGU5LTQ2NzktYmUyZi01MTU0ZDhlOTA0NDEiLCJpZCI6OTYzMTEsImlhdCI6MTY1NDM5NzI2NX0.hwxYzN1S5cS8PSe3n_GZX4SzLdix1p1oqDl0_muro1o";

onMounted(() => {
  const viewer = initViwer();
  // 获取鼠标点击经纬度值
  new MousePosition(viewer);

  //   初始化导航罗盘
  let navigation = new CesiumNavigaion(viewer, navigationConfig);
  motifyMap(viewer);
  motifyBuding(viewer);
  // 动态光锥
  new LightCone(viewer, Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000));
  // 上升区域飞线
  new RectFlyLight(viewer);
  // 创建道路线路
  new RoadLightLine(viewer);
  // 雷达
  new RadarLight(viewer);
  // 光波
  new SpreadLight(viewer);
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

#mouse-position {
  position: fixed;
  bottom: 0;
  right: 0;
  background: black;
  color: #fff;
  padding: 4px 10px;
}
</style>
