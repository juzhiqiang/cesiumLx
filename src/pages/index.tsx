import { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import styles from "./index.less";
import { TOKEN } from "@/units/cesiumConfig";
import { TerrainFn } from "./terrain";

export default function HomePage() {
  const cesiumContainer = useRef<any>();
  const viewerRef = useRef<any>();
  useEffect(() => {
    // 设置token
    Cesium.Ion.defaultAccessToken = TOKEN;
    // 创建实例
    viewerRef.current = new Cesium.Viewer("cesiumContainer", {
      // cesium 控制器
      terrainProvider: TerrainFn(),

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
      // 天地图矢量路径图
      // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      //   url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
      //   layer: "tdtBasicLayer",
      //   style: "default",
      //   format: "image/jpeg",
      //   tileMatrixSetID: "GoogleMapsCompatible",
      // }),
      //   天地图影像服务
      imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
      }),
      // OSM地图,
      // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
      //   url: "https://a.tile.openstreetmap.org/",
      // }),
      // 高德矢量地图,
      // imageryProvider: new Cesium.UrlTemplateImageryProvider({
      //   url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      //   layer: "tdtVecBasicLayer",
      //   style: "default",
      //   format: "image/png",
      //   tileMatrixSetID: "GoogleMapsCompatible",
      // }),
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

    // 设置图层叠加
    const imageryLayers = viewerRef.current.imageryLayers;
    const layer = imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        layer: "tdtVecBasicLayer",
        style: "default",
        format: "image/png",
        tileMatrixSetID: "GoogleMapsCompatible",
      })
    );
    // 地图叠加时需要设置图层透明度
    layer.alpha = 0.6;
  }, []);
  return (
    <div
      className={styles.cesiumContainer}
      id="cesiumContainer"
      ref={cesiumContainer}
    ></div>
  );
}
