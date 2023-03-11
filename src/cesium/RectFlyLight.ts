import * as Cesium from 'cesium';
import * as turf from '@turf/turf'
import PolylineTrailMaterialProperty from './material/polyLine';
// 上升性质区域飞线
export class RectFlyLight {
    box: turf.helpers.BBox | undefined;
    constructor(viewer: Cesium.Viewer) {
        // 设置需要有飞线的矩形区域
        this.box = [
            113.2191, 23.009,
            113.4191, 23.209,
        ];
        // 创建随机点
        let points = turf.randomPoint(300, {
            bbox: this.box
        });
        console.log('矩阵内随机点', points)
        // 通过生成的随机点生成线
        let features = points.features;
        features.forEach(item => {
            // 获取点经纬度
            let point = item.geometry.coordinates;
            // 设置线起始位置
            let start = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0)
            let end = Cesium.Cartesian3.fromDegrees(point[0], point[1], Math.random() * 1000 + 100);

            // 创建线
            let flyLine = viewer.entities.add({
                polyline: {
                    positions: [start, end],
                    width: 2,
                    material: new PolylineTrailMaterialProperty()
                }
            })
        })
    }
}