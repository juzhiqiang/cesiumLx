import * as Cesium from "cesium";
import gsap from "gsap";
// 设置静态值，多次使用防止修改到之前的颜色
export default class LightSpreadMaterialProperty {
    definitionChanged: any;
    name: any;
    color: any;
    constructor(name: any) {
        this.name = name;
        this.definitionChanged = new Cesium.Event();
        (Cesium.Material as any)._materialCache.addMaterial(
            "LightSpreadMaterial",
            {
                fabric: {
                    type: 'LightSpreadMaterial',
                    uniforms: {
                        image: './texture/hexagon.png'
                    },
                    source: `
                        czm_material czm_getMaterial(czm_materialInput materialInput)
                        {
                          // 生成默认的基础材质
                            czm_material material = czm_getDefaultMaterial(materialInput);
                            vec2 st = materialInput.st;
                            // 通过uv采样
                            vec4 color = texture(image,st);
                            material.diffuse = color.rgb;
                            material.alpha = color.a;
                            return material;
                        }
                    `
                }

            }
        );
    }
    getType() {
        // 返回材质类型
        return "LightSpreadMaterial";
    }
    getValue(time: any, result: any) {
        // 返回材质值
        return result;
    }
    equals(other: { name: any; }) {
        // 判断两个材质是否相等
        return (
            other instanceof LightSpreadMaterialProperty &&
            this.name === other.name
        );
    }
}
