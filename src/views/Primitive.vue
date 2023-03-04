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

  // 添加几何体
  const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
    height: 0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });
  const rectGeometry1 = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(90, 20, 110, 30),
    height: 0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });
  // 几何体实例
  const rectang = new Cesium.GeometryInstance({
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.RED.withAlpha(0.5)
      ),
    },
  });
  const rectang1 = new Cesium.GeometryInstance({
    id: "blue",
    geometry: rectGeometry1,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.BLUE.withAlpha(0.5)
      ),
    },
  });
  // 设置外观
  const appearance = new Cesium.PerInstanceColorAppearance({
    flat: false,
  });
  // 创建几何体图元
  const primitive = new Cesium.Primitive({
    // 两个开始使用数组，一致直接使用单实例
    geometryInstances: [rectang, rectang1],
    appearance: appearance,
  });
  viewer.scene.primitives.add(primitive);
  viewer.camera.setView({
    destination: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
  });

  // 动态修改图元颜色
  let timer = setInterval(() => {
    // 获取实体id 并修改颜色
    let getAttr = primitive.getGeometryInstanceAttributes("blue");
    getAttr.color = Cesium.ColorGeometryInstanceAttribute.toValue(
      Cesium.Color.fromRandom({
        alpha: 0.5,
      })
    );
  }, 1000);
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
