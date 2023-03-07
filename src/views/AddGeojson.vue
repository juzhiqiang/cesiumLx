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

  // 加载geojson
  const dataGeojson = Cesium.GeoJsonDataSource.load(
    "https://geo.datav.aliyun.com/areas_v2/bound/geojson?code=100000_full",
    {
      //轮廓线颜色设置
      stroke: Cesium.Color.SKYBLUE.withAlpha(0.8),
      // 填充颜色
      fill: Cesium.Color.RED.withAlpha(0.5),
      // 边框宽度【实际在web端无效，可采用划线实现】
      strokeWidth: 4,
    }
  );
  dataGeojson.then((dataGeojson) => {
    let gz = viewer.dataSources.add(dataGeojson);
    let entities = dataGeojson.entities.values;
    entities.forEach((entity: any, i) => {
      // 随机颜色
      entity.polygon.material = new Cesium.ColorMaterialProperty(
        Cesium.Color.fromRandom({
          alpha: 1,
        })
      );
      entity.polygon.outline = false;
      // 随机深每个区块的拉伸高度
      let randomNum = parseInt(String(Math.random() * 100000));
      entity.polygon.extrudedHeight = randomNum;
    });
    console.log(dataGeojson);
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
