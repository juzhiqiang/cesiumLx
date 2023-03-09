import * as Cesium from "cesium";
export const initViwer = () => {
    // 设置默认资源位置
    (window as any).CESIUM_BASE_URL = "/";
    // 初始化窗口
    const viewer: Cesium.Viewer = new Cesium.Viewer("cesiumContainer", {
        // 是否显示信息框
        infoBox: false,
        // 搜索
        geocoder: false,
        // 显示home
        homeButton: false,
        // 场景模式选择2的，3d
        sceneModePicker: false,
        // 设置图层选择器
        baseLayerPicker: false,
        // 帮助按钮
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        // 地形设置
        terrainProvider: Cesium.createWorldTerrain({
            // 法相
            requestVertexNormals: true,
            // 水纹
            requestWaterMask: true,
        }),
    });
    // 天安门
    const postion = Cesium.Cartesian3.fromDegrees(116.392428, 39.90923, 500);

    // 隐藏logo
    viewer.cesiumWidget.creditContainer.style.display = "none";

    // 生成广州塔位置
    const postion2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000);

    viewer.camera.flyTo({
        destination: postion2,
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0,
        },
    });
    return viewer
}