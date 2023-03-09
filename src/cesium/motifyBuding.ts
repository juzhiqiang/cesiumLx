import * as Cesium from 'cesium'
export const motifyBuding = (viewer: Cesium.Viewer) => {
    // 添加3d建筑
    const tiles3d = Cesium.createOsmBuildings();
    const osmBuildings = viewer.scene.primitives.add(tiles3d);
    // 监听当瓦片加载时候执行
    tiles3d.tileVisible.addEventListener((tiles) => {
        // 获取3d内容
        const cesium3DTileCon = tiles.content;
        const featuresLength = cesium3DTileCon.featuresLength;
        console.log(cesium3DTileCon)
        for (let i = 0; i < featuresLength; i++) {
            const model = cesium3DTileCon.getFeature(i).content._model;
            console.log(model)
            // 修改模型片元着色器
            const fragmentShaderSource = (model._rendererResources.sourceShaders[1] = `
                    varying vec3 v_positionMC;
                    varying vec3 v_positionEC;
                    varying vec3 v_st;
    
                    void main(){
                        czm_materialInput materialInput;
                        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
                    }
                `)
            // 通知更新着色器
            model._shouldRegenerateShaders = true;
        }
    })


    return {
        osmBuildings
    }
}