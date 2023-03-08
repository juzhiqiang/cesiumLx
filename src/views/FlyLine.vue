<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
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
    animation: true,
    // 时间轴
    timeline: true,
    shouldAnimate: true,
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

  // 添加3d建筑
  const osmBuildings = viewer.scene.primitives.add(Cesium.createOsmBuildings());

  // 创建采样点
  const positionProperty = new Cesium.SampledPositionProperty();
  // 创建时间间隔 单位s
  const timeStepInSeconds = 30;
  // 飞行时间
  const totalSeconds = (planeData.length - 1) * timeStepInSeconds;
  // 设置起点时间
  const time = new Date("2022-03-09T00:00:00Z");
  // cesium 默认时间是儒略日，所以需要将时间转换为儒略日
  const startJulianDate = Cesium.JulianDate.fromDate(time);
  // 停下来时间
  const endJulianDate = Cesium.JulianDate.addSeconds(
    startJulianDate,
    totalSeconds,
    new Cesium.JulianDate()
  );
  // 将查看器的时间调整到起点结束点的范围
  viewer.clock.startTime = startJulianDate.clone();
  viewer.clock.stopTime = endJulianDate.clone();
  viewer.clock.currentTime = startJulianDate.clone();
  viewer.timeline.zoomTo(startJulianDate, endJulianDate);

  planeData.forEach((dataPoint, i: number) => {
    // 没一个点的时间
    const time = Cesium.JulianDate.addSeconds(
      startJulianDate,
      i * timeStepInSeconds,
      // 上述得到时间赋值给新的时间
      new Cesium.JulianDate()
    );
    // 设置当前点位置
    const position = Cesium.Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    );

    // 添加轨迹采样点
    positionProperty.addSample(time, position);
    // const entity = viewer.entities.add({
    //   position: position,
    //   point: {
    //     pixelSize: 10,
    //     color: Cesium.Color.RED,
    //     outlineColor: Cesium.Color.WHITE,
    //     outlineWidth: 2,
    //   },
    // });

    // 创建飞机模型
    const planeEntity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: startJulianDate,
          stop: endJulianDate,
        }),
      ]),
      name: "飞机",
      position: positionProperty,
      // 根据采样点算飞机方向
      orientation: new Cesium.VelocityOrientationProperty(positionProperty),
      model: {
        uri: "./model/Air.glb",
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
      // 绘制轨迹线
      // path: new Cesium.PathGraphics({
      //   width: 5,
      // }),
    });

    // 相机追踪模型实体
    viewer.trackedEntity = planeEntity;

    // 设置时间速率
    viewer.clock.multiplier = 90;
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
