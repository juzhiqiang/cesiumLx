import * as Cesium from "cesium";
// 添加3d建筑
export const osmBuildings = (viewer: Cesium.Viewer) => {
  viewer.scene.primitives.add(Cesium.createOsmBuildings());
};

// 添加3d模型
export const addGltf = (viewer: Cesium.Viewer) => {
  viewer.entities.add({
    name: "Airplane",
    position: Cesium.Cartesian3.fromDegrees(
      116.3972282409668,
      39.90960456049752,
      1000
    ),
    model: {
      uri: "/Cesium/model/Air.glb",
      minimumPixelSize: 128,
      //   设置多远时才开始出现模型
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 20000),
    },
  });
};
