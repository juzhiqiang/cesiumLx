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

  // 通过方向键移动位置
  document.addEventListener("keydown", (e) => {
    const getCameraHeight = viewer.camera.positionCartographic.height;
    // 高度离地作为移动速率
    const moveRete = getCameraHeight / 100;
    if (e.key === "w") {
      // 向前
      viewer.camera.moveForward(moveRete);
    } else if (e.key === "s") {
      // 向后
      viewer.camera.moveBackward(moveRete);
    } else if (e.key === "d") {
      viewer.camera.moveRight(moveRete);
    } else if (e.key === "a") {
      viewer.camera.moveLeft(moveRete);
    } else if (e.key === "q") {
      // 左旋转
      viewer.camera.lookLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key === "z") {
      // 右旋转
      viewer.camera.lookRight(Cesium.Math.toRadians(0.1));
    } else if (e.key === "r") {
      viewer.camera.lookUp(Cesium.Math.toRadians(0.1));
    } else if (e.key === "f") {
      viewer.camera.lookDown(Cesium.Math.toRadians(0.1));
    } else if (e.key === "g") {
      viewer.camera.twistLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key === "h") {
      viewer.camera.twistRight(Cesium.Math.toRadians(0.1));
    }
  });
});

// 直接到某个位置
const setView = (
  viewer: Cesium.Viewer,
  postion: Cesium.Rectangle | Cesium.Cartesian3 | undefined
) => {
  viewer.camera.setView({
    destination: postion,
    // 指定视角
    orientation: {
      // 相机朝向
      heading: Cesium.Math.toRadians(0),
      // 相机俯仰角,0垂直向下
      pitch: Cesium.Math.toRadians(-90),
      // 相机滚动角
      roll: 0,
    },
  });
};

// 飞行到指定位置
const flyView = (
  viewer: Cesium.Viewer,
  postion: Cesium.Rectangle | Cesium.Cartesian3
) => {
  viewer.camera.flyTo({
    destination: postion,
    // 指定视角
    orientation: {
      // 相机朝向
      heading: Cesium.Math.toRadians(0),
      // 相机俯仰角,0垂直向下
      pitch: Cesium.Math.toRadians(-90),
      // 相机滚动角
      roll: 0,
    },
  });
};

// 前后左右
const fwFn = (key: string) => {
  const getCameraHeight = viewer.camera.positionCartographic.height;
  // 高度离地作为移动速率
  const moveRete = getCameraHeight / 100;
  if (key === "w") {
    // 向前
    viewer.camera.moveForward(moveRete);
  } else if (key === "s") {
    // 向后
    viewer.camera.moveBackward(moveRete);
  } else if (key === "d") {
    viewer.camera.moveRight(moveRete);
  } else if (key === "a") {
    viewer.camera.moveLeft(moveRete);
  }
};
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
