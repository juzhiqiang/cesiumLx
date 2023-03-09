import * as Cesium from "cesium";

// 深色系地图
export const motifyMap = (viewer: Cesium.Viewer) => {
    // 获取地图影像图层
    const baseLayer: any = viewer.imageryLayers.get(0);
    console.log(baseLayer)
    // 设置2个变量，用来判断是否进行颜色的翻转和过滤
    baseLayer.invertColor = true;
    // 色值过滤
    baseLayer.filtRGB = [0, 50, 100];
    // 更改地图着色器代码
    const baseFragmentShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;
    // 循环修改着色器
    baseFragmentShader.forEach((item: string, i: number) => {
        const str = 'color = czm_saturation(color, textureSaturation);\n#endif\n';
        let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n';
        if (baseLayer.invertColor) {
            strT += `
            color.r = color.r*${baseLayer.filtRGB[0]}.0/255.0;
            color.g = color.g*${baseLayer.filtRGB[1]}.0/255.0;
            color.b = color.b*${baseLayer.filtRGB[2]}.0/255.0;
          `;
        }
        baseFragmentShader[i] = item.replace(str, strT)
    });
}