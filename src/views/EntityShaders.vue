<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as Cesium from "cesium";
import gsap from "gsap";
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

  // 自定义entity材质
  class CustomMaterialPropery {
    definitiononChanged: any;
    constructor() {
      // 材质事件
      this.definitiononChanged = new Cesium.Event();
      // 增加自定义材质
      (Cesium.Material as any)._materialCache.addMaterial("CustomMaterial", {
        fabric: {
          type: "CustomMaterial",
          uniforms: {},
          source: `
            czm_material czm_getMaterial(czm_materialInput materialInput){
              czm_material material = czm_getDefaultMaterial(materialInput);
              material.diffuse = vec3(materialInput.st,0.0);
              return material;
            }
          `,
        },
      });
    }

    getType() {
      return "CustomMaterial";
    }

    getValue(timea: any, result: { [key: string]: number }) {
      return result;
    }

    equals(other: Cesium.Property): boolean {
      // 判断两个材质是否相等
      return other instanceof CustomMaterialPropery;
    }
  }

  // entity 添加几何体
  const rectangle = viewer.entities.add({
    id: "entity",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(90, 20, 110, 30),
      // 设置实体材质
      material: new CustomMaterialPropery(),
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
