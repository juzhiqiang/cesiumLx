import { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import styles from "./index.less";
import { TOKEN } from "@/units/cesiumConfig";

export default function HomePage() {
  const cesiumContainer = useRef<any>();
  const viewerRef = useRef<any>();
  useEffect(() => {
    // 设置token
    Cesium.Ion.defaultAccessToken = TOKEN;
    // 创建实例
    viewerRef.current = new Cesium.Viewer("cesiumContainer", {
      // cesium 控制器
      terrainProvider: Cesium.createWorldTerrain(),
      // 查询框，可搜索地理信息位置
      geocoder: false,
      // 是否可以控回到初始状态
      homeButton: false,
      // 模式控制，3d/2.5D/2D
      sceneModePicker: false,
      // 图层控制
      baseLayerPicker: false,
      // 操作提示
      navigationHelpButton: false,
      // 是否播放动画
      animation: false,
      // 是否显示时间轴
      timeline: false,
      // 全屏
      fullscreenButton: false,
      // 自定义天空盒
      skyBox: new Cesium.SkyBox({
        sources: {
          positiveX: "./texture/sky/px.jpg",
          negativeX: "./texture/sky/nx.jpg",
          positiveY: "./texture/sky/ny.jpg",
          negativeY: "./texture/sky/py.jpg",
          positiveZ: "./texture/sky/pz.jpg",
          negativeZ: "./texture/sky/nz.jpg",
        },
      }),
    });
    // 隐藏LOGO
    viewerRef.current.cesiumWidget.creditContainer.style.display = "none";
    // 设置默认视角
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      // 西经
      89.5,
      // 南纬
      20.4,
      // 东经
      110.4,
      // 北纬
      61.2
    );

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = viewerRef.current.scene.primitives.add(
      Cesium.createOsmBuildings()
    );
  }, []);
  return (
    <div
      className={styles.cesiumContainer}
      id="cesiumContainer"
      ref={cesiumContainer}
    ></div>
  );
}
