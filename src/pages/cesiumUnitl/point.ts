import * as Cesium from "cesium";
// 添加图元
export const addPoint = (viewer: Cesium.Viewer) => {
  const _pointEntiy = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000),
    billboard: {
      image: "",
      width: 30,
      height: 30,
    },
  });
};

// 添加点
export const Point = (Viewer: Cesium.Viewer) => {
  const _pointEntiy = Viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000),
    point: {
      pixelSize: 20,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHEAT,
      outlineWidth: 4,
    },
  });
};

// 添加3d建筑
export const osmBuildings = (viewer: Cesium.Viewer) => {
  viewer.scene.primitives.add(Cesium.createOsmBuildings());
};
