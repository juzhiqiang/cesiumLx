// 使用图片当材质
import * as Cesium from "cesium";
import gsap from "gsap";
// 设置静态值，多次使用防止修改到之前的颜色
export default class SpritelineTrailMaterialProperty {
    definitionChanged: any;
    params: { uTime: number; };
    name: any;
    color: any;
    constructor(name: any) {
        this.name = name;
        this.definitionChanged = new Cesium.Event();
        (Cesium.Material as any)._materialCache.addMaterial(
            "SpritelineTrailMaterial",
            {
                fabric: {
                    type: 'SpritelineTrailMaterial',
                    uniforms: {
                        uTime: 0,
                        image: './texture/spriteline1.png'
                    },
                    source: `
                        czm_material czm_getMaterial(czm_materialInput materialInput)
                        {
                          // 生成默认的基础材质
                            czm_material material = czm_getDefaultMaterial(materialInput);
                            // 获取st
                            vec2 st = materialInput.st;
                            // 根据uv采样颜色
                            // 在1.97.0之前使用texture2D，在1.97.0开始使用texture 函数，原因因为最新版本模式使用wgl2上下文模式 
                            vec4 color = texture(image,vec2(fract(st.s-uTime),st.t));
                            // 设置透明度
                            material.alpha = color.a;
                            material.diffuse = color.rgb;  
                            return material;
                        }
                    `
                }

            }
        );

        this.params = {
            uTime: 0,
        };
        gsap.to(this.params, {
            uTime: 1,
            duration: 1,
            repeat: -1,
        });
    }
    getType() {
        // 返回材质类型
        return "SpritelineTrailMaterial";
    }
    getValue(time: any, result: any) {
        result.uTime = this.params.uTime;
        // 返回材质值
        return result;
    }
    equals(other: { name: any; }) {
        // 判断两个材质是否相等
        return (
            other instanceof SpritelineTrailMaterialProperty &&
            this.name === other.name
        );
    }
}
