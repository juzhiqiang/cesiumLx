import * as Cesium from 'cesium'
export const motifyBuding = (viewer: Cesium.Viewer) => {
    // 添加3d建筑
    const tiles3d = Cesium.createOsmBuildings();
    const osmBuildings = viewer.scene.primitives.add(tiles3d);
    // 监听当瓦片加载时候执行--- 该方法在1.96.0之后不在生效
    console.log(tiles3d)
    // tiles3d.tileVisible.addEventListener((tiles) => {
    //     // 获取3d内容
    //     const cesium3DTileCon = tiles.content;
    //     const featuresLength = cesium3DTileCon.featuresLength;

    //     for (let i = 0; i < featuresLength; i++) {
    //         const model = cesium3DTileCon.getFeature(i).content._model;
    //         // 修改模型片元着色器
    //         const fragmentShaderSource = (model._rendererResources.sourceShaders[1] = `
    //                 // 获取相机坐标系坐标 
    //                 varying vec3 v_positionEC;
    //                 void main(){
    //                     czm_materialInput materialInput;
    //                     // 获取模型position信息
    //                     vec4 position = czm_inverseModelView * vec4(v_positionEC,1.0);
    //                     // 设置基础色
    //                     // gl_FragColor = vec4(0.2,0.5,1.0,1.0);
    //                     // 按高度进行颜色变暗
    //                     gl_FragColor *= vec4(vec3(position.z * 300.0),1.0);
    //                     // 动态光环
    //                     // 获取当前帧数 czm_frameNumber,fract(x) 返回x的小数部分
    //                     float time = fract(czm_frameNumber/(60.0*10.0));
    //                     // 光往返操作
    //                     time =  abs(time - 0.5)*2.0;
    //                     // 返回0，1的之间最小值
    //                     float diff = abs(clamp(position.z/500.0,0.0,1.0) - time);
    //                     // step x大于等于edge，返回1，反之0
    //                     diff = step(0.01,diff);
    //                     gl_FragColor.rgb += vec3(0.5)*(1.0-diff);
    //                 }
    //             `)
    //         // 通知更新着色器
    //         model._shouldRegenerateShaders = true;
    //     }
    // })
    // 1.97.0之后用自定义着色器可设置着色器动画
    const customShader = new Cesium.CustomShader({
        fragmentShaderText: `
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
          float strength = fsInput.attributes.positionMC.z/200.0;
          
          material.diffuse = vec3(strength,0.3*strength,strength);
          float time  = fract(czm_frameNumber/(60.0*10.0));
          time = abs(time-0.5)*2.0;
          float diff = abs(clamp(fsInput.attributes.positionMC.z/500.0, 0.0, 1.0) - time) ;
          // step(edge, x)，如果x大于等于edge，返回1，否则返回0
          diff = step(0.01, diff);
          // gl_FragColor.rgb += vec3(0.5)*(1.0-diff);
          material.diffuse += vec3(0.5)*(1.0-diff);
        }
        `,
    });

    tiles3d.customShader = customShader;


    return {
        osmBuildings
    }
}