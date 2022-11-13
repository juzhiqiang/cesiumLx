import * as Cesium from "cesium";
// 屏幕坐标系，二维笛卡尔坐标系，Cartesian2
// 地理坐标系，cesium中使用wgs84,Cartographic类型
// 三维笛卡尔坐标系，Cartesian3，
// 角度与弧度的转换
// 角度转弧度
export const radians = (radians: number) => Cesium.Math.toRadians(radians);

// 弧度转角度
export const degress = () => Cesium.Math.toDegrees(2 * Math.PI);

// 经纬度转笛卡尔3坐标
export const cartesian3 = (lon: number, lat: number, height: number = 0) =>
  Cesium.Cartesian3.fromDegrees(lon, lat, height);

//   将笛卡尔3转弧度制经纬度
export const cartographic = (cartesian3: Cesium.Cartesian3) =>
  Cesium.Cartographic.fromCartesian(cartesian3);
