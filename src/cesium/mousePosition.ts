// 获取鼠标所在位置经纬度
import * as Cesium from "cesium";
export class MousePosition {
    constructor(viewer: Cesium.Viewer) {
        // 监听鼠标移动事件
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

        handler.setInputAction((movement: { endPosition: Cesium.Cartesian2; }) => {
            // 获取鼠标经纬度
            const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
            if (cartesian) {
                const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
                const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
                const heightString = cartographic.height.toFixed(3);
                // 显示经纬度
                (document as any).getElementById('mouse-position').innerHTML = `经度: ${longitudeString} 纬度: ${latitudeString} 高度${heightString}`
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }
}