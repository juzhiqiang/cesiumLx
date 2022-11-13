// 相机方法
import * as Cesium from "cesium";

// 瞬间到达指定位置，视角
export const setViwer = (
  viewer: Cesium.Viewer,
  position: Cesium.Cartesian3 = Cesium.Cartesian3.fromDegrees(
    116.3972282409668,
    39.90960456049752,
    1000
  ),
  heading = Cesium.Math.toRadians(0),
  pitch = Cesium.Math.toRadians(-90),
  roll = 0
) => {
  viewer.camera.setView({
    // 指定相机位置
    destination: position,
    // 指定相机视角
    orientation: {
      // 指定相机朝向
      heading,
      //   指定相机俯仰角
      pitch,
      //   指定相机滚动角
      roll,
    },
  });
};

// 缓动飞到指定位置
export const setFlyTo = (
  viewer: Cesium.Viewer,
  position: Cesium.Cartesian3 = Cesium.Cartesian3.fromDegrees(
    116.3972282409668,
    39.90960456049752,
    1000
  ),
  heading = Cesium.Math.toRadians(0),
  pitch = Cesium.Math.toRadians(-90),
  roll = 0
) => {
  viewer.camera.flyTo({
    // 指定相机位置
    destination: position,
    // 指定相机视角
    orientation: {
      // 指定相机朝向
      heading,
      //   指定相机俯仰角
      pitch,
      //   指定相机滚动角
      roll,
    },
  });
};

export const keyCodeHandle = (viewer: Cesium.Viewer) => {
  // 通过方向键移动位置
  document.addEventListener("keydown", (e) => {
    const getCameraHeight = viewer.camera.positionCartographic.height;
    // 高度离地作为移动速率
    const moveRete = getCameraHeight / 100;
    if (e.key === "w") {
      // 向前
      viewer.camera.moveForward(moveRete);
    } else if (e.key === "s") {
      // 向后
      viewer.camera.moveBackward(moveRete);
    } else if (e.key === "d") {
      viewer.camera.moveRight(moveRete);
    } else if (e.key === "a") {
      viewer.camera.moveLeft(moveRete);
    } else if (e.key === "q") {
      // 左旋转
      viewer.camera.lookLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key === "z") {
      // 右旋转
      viewer.camera.lookRight(Cesium.Math.toRadians(0.1));
    } else if (e.key === "r") {
      viewer.camera.lookUp(Cesium.Math.toRadians(0.1));
    } else if (e.key === "f") {
      viewer.camera.lookDown(Cesium.Math.toRadians(0.1));
    } else if (e.key === "g") {
      viewer.camera.twistLeft(Cesium.Math.toRadians(0.1));
    } else if (e.key === "h") {
      viewer.camera.twistRight(Cesium.Math.toRadians(0.1));
    }
  });
};
