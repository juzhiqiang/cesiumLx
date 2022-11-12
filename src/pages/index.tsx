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
      terrainProvider: Cesium.createWorldTerrain(),
    });
    // 隐藏LOGO
    viewerRef.current.cesiumWidget.creditContainer.style.display = "none";
    // 设置默认视角
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE  = Cesium.Rectangle.fromDegrees(
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
