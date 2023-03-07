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
  // 自定义着色器
  const shaders = {
    material1: new Cesium.Material({
      fabric: {
        type: "Color",
        // 材质对象
        uniforms: {
          color: new Cesium.Color(1.0, 0.0, 1.0, 0.5),
        },
      },
    }),
    material2: new Cesium.Material({
      fabric: {
        uniforms: {
          uTime: 0,
        },
        // 自定义材质资源
        source: `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
          // 获取默认的基础材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          // 设置材质漫反射颜色
          // material.diffuse = vec3(materialInput.st,1.0);
          // 设置条纹
          float strength = mod(materialInput.st.x-uTime * 10.0, 1.0);
          material.diffuse = vec3(strength,0.0,0.0);
          return  material;
        }
        `,
      },
    }),
  };
  gsap.to(shaders.material2.uniforms, {
    uTime: 0.1,
    duration: 2,
    repeat: -1,
    ease: "linear",
  });
  // 添加几何体
  const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
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

  // 设置外观
  const appearance = new Cesium.EllipsoidSurfaceAppearance({
    material: shaders.material2,
    aboveGround: false,
    translucent: true,
    // 着色器
    // fragmentShaderSource:`
    //     varying vec3 v_positionMC;
    //     varying vec3 v_positionEC;
    //     varying vec2 v_st;
    //     void main(){
    //       czm_materialInput materialInput;
    //       gl_FragColor = vec4(v_st,1.0,1.0);
    //     }
    // `
  });
  // 创建几何体图元
  const primitive = new Cesium.Primitive({
    // 两个开始使用数组，一致直接使用单实例
    geometryInstances: rectang,
    appearance: appearance,
    show: true,
  });
  viewer.scene.primitives.add(primitive);
  viewer.camera.setView({
    destination: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
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
