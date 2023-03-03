<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
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

  // 生成广州塔位置
  const postion2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000);

  viewer.camera.flyTo({
    destination: postion2,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      roll: 0,
    },
  });

  // 添加3d建筑
  const osmBuildings = viewer.scene.primitives.add(Cesium.createOsmBuildings());
  // 添加模型
  const airplane = viewer.entities.add({
    name: "Airplane",
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 800),
    model: {
      uri: "./model/airplane.gltf",
      minimumPixelSize: 128,
      // 设置轮廓
      silhouetteSize: 10,
      silhouetteColor: Cesium.Color.WHITE,
      // 设置相机什么时候显示模型
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 20000),
    },
  });
  // 创建点
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 10),
    point: {
      // 点大小
      pixelSize: 30,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 4,
    },
    // 图元
    // billboard: {
    //   image: "./images/point.png",
    //   width: 80,
    //   height: 150,
    //   scale: 0.5,
    // },
  });
  // 添加文字标签，广告牌
  const lable = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 600),
    label: {
      text: "广州塔",
      font: "24px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      // 文字偏移
      pixelOffset: new Cesium.Cartesian2(0, -23),
      // 文字显示位置
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      // 垂直设置
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
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
