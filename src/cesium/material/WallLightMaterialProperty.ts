// 使用图片当材质
import * as Cesium from "cesium";
import gsap from "gsap";
// 设置静态值，多次使用防止修改到之前的颜色
export default class WallLightMaterialProperty {
    definitionChanged: any;
    params: { uTime: number; };
    name: any;
    color: any;
    constructor(name: any) {
        this.name = name;
        this.definitionChanged = new Cesium.Event();
        (Cesium.Material as any)._materialCache.addMaterial(
            "WallLightMaterial",
            {
                fabric: {
                    type: 'WallLightMaterial',
                    uniforms: {
                        uTime: 0,
                        image: './texture/spriteline2.png'
                    },
                    source: `
                        czm_material czm_getMaterial(czm_materialInput materialInput)
                        {
                          // 生成默认的基础材质
                            czm_material material = czm_getDefaultMaterial(materialInput);
                            vec2 st = materialInput.st;
                            vec4 color = texture(image,vec2(fract(st.y-uTime),st.x));
                            material.diffuse = color.rgb;
                            material.alpha = color.a;                            

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
            ease: 'linear'
        });
    }
    getType() {
        // 返回材质类型
        return "WallLightMaterial";
    }
    getValue(time: any, result: any) {
        result.uTime = this.params.uTime;
        // 返回材质值
        return result;
    }
    equals(other: { name: any; }) {
        // 判断两个材质是否相等
        return (
            other instanceof WallLightMaterialProperty &&
            this.name === other.name
        );
    }
}
