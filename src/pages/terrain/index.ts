import * as Cesium from "cesium";
// 地形配置

// 系统地形
const system = Cesium.createWorldTerrain({
  requestVertexNormals: true,
  requestWaterMask: true,
});

// 自定义地形
const cutromTerrain = new Cesium.CesiumTerrainProvider({
  url: "/Cesium/terrains/gz",
});
export const TerrainFn = () => {
  return cutromTerrain;
};
