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

  const materialType = {
    // 纯色
    colorMaterial: new Cesium.ColorMaterialProperty(
      new Cesium.Color(1, 1, 0, 1)
    ),
    // 格纹
    gwMaterial: new Cesium.CheckerboardMaterialProperty({
      evenColor: Cesium.Color.GREEN,
      oddColor: Cesium.Color.WHITE,
      repeat: new Cesium.Cartesian2(2, 4),
    }),
    // 虚线材质
    line: new Cesium.PolylineDashMaterialProperty({
      dashLength: 16,
      color: Cesium.Color.GREEN,
    }),
    // 箭头材质
    jtLine: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED),
    // 发光
    runLine: new Cesium.PolylineGlowMaterialProperty({
      // 发光程度
      glowPower: 1,
      // 尾锥缩小程度
      taperPower: 0.5,
      color: Cesium.Color.RED,
    }),
  };

  // entity 添加几何体
  const rectangle = viewer.entities.add({
    id: "entity",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(90, 20, 110, 30),
      // 设置实体材质
      material: materialType.gwMaterial,
    },
  });

  // entitly折线
  const redLine = viewer.entities.add({
    id: "zx",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
      width: 5,
      material: materialType.runLine,
    },
  });

  // primitive 设置外观
  const primitiveAPPerance = {
    // 使用instance实例的颜色去着色,
    appearance: new Cesium.PerInstanceColorAppearance({
      flat: false,
    }),
    // 自定义材质，会自动假定与地球表面平行，可以在计算大量顶点属性时候节省内存
    custom: new Cesium.EllipsoidSurfaceAppearance({
      material: Cesium.Material.fromType("Color", {
        color: Cesium.Color.AQUA.withAlpha(0.8),
      }),
    }),
    // 基类
    baseCls: new Cesium.MaterialAppearance({
      material: Cesium.Material.fromType("Color", {
        color: Cesium.Color.AQUA.withAlpha(0.8),
      }),
    }),
  };
  // 添加几何体
  const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
    height: 0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });

  // 几何体实例
  const rectang = new Cesium.GeometryInstance({
    id: "red",
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.RED.withAlpha(0.5)
      ),
    },
  });

  // 创建几何体图元
  const primitive = new Cesium.Primitive({
    // 两个开始使用数组，一致直接使用单实例
    geometryInstances: [rectang],
    appearance: primitiveAPPerance.custom,
  });
  viewer.scene.primitives.add(primitive);
  viewer.camera.setView({
    destination: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
  });

  // 拾取
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((movement: { position: Cesium.Cartesian2 }) => {
    console.log("屏幕坐标", movement);
    // 选中物体
    const pickedObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedObject)) {
      console.log(pickedObject.id);
      let getAttr = primitive.getGeometryInstanceAttributes(pickedObject.id);
      getAttr.color = Cesium.ColorGeometryInstanceAttribute.toValue(
        Cesium.Color.fromRandom({
          alpha: 0.5,
        })
      );
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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
