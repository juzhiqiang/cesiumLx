<template>
  <div id="cesiumContainer1" ref="cesiumContainer"></div>

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
import planeData from "@/assets/json/plane.json";
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
  viewer = new Cesium.Viewer("cesiumContainer1", {
    infoBox: true,
    shouldAnimate: true,
  });

  // 设置沙箱允许使用js
  const iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
  iframe.setAttribute(
    "sandbox",
    "allow-same-origin allow-popups allow-forms allow-scripts"
  );

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none";

  // 添加3d建筑
  const titles3d = Cesium.createOsmBuildings();
  const osmBudings = viewer.scene.primitives.add(titles3d);
  const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1000);
  viewer.camera.flyTo({
    destination: position,
  });

  // 设置建筑样式
  console.log(titles3d.style);
  titles3d.style = new Cesium.Cesium3DTileStyle({
    // 常规设置
    // color: `color('red')`
    // 按cesium自带条件渲染
    show: true,
    // color: {
    //   conditions: [
    //     [
    //       "${feature['building']} === 'apartments'",
    //       "color('rgba(50, 255, 0, 0.5)')",
    //     ],
    //     [
    //       "${feature['building']} === 'office'",
    //       "color('rgba(255, 255, 0, 0.5)')",
    //     ],
    //     [
    //       "${feature['cesium#estimatedHeight']} > 300",
    //       "color('rgba(200, 200, 255, 0.7)')",
    //     ],
    //     [
    //       "${feature['cesium#estimatedHeight']} > 100",
    //       "color('rgba(100, 100, 255, 0.7)')",
    //     ],
    //     [
    //       "${feature['cesium#estimatedHeight']} > 50",
    //       "color('rgba(50, 50, 150, 0.7)')",
    //     ],
    //     ["true", "color('white')"],
    //   ],
    // },
    // 按自定义距离规则设置建筑颜色
    defines: {
      // 自定义距离函数
      distance:
        "distance(vec2(${feature['cesium#longitude']},${feature['cesium#latitude']}),vec2(113.3191,23.109))",
    },
    color: {
      conditions: [
        ["${distance} < 0.01", "color('green')"],
        ["${distance} < 0.03", "color('yellow')"],
        ["${distance} < 0.05", "color('red')"],
        ["true", "color('white')"],
      ],
    },
  });
});
</script>

<style scoped>
#cesiumContainer1 {
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
