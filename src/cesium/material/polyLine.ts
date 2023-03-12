import * as Cesium from "cesium";
import gsap from "gsap";
// 设置静态值，多次使用防止修改到之前的颜色
let typeNum = 0;
export default class PolylineTrailMaterialProperty {
    definitionChanged: any;
    params: { uTime: number; };
    color: Cesium.Color;
    num: number;
    constructor(color = new Cesium.Color(0.7, 0.6, 1.0, 1.0)) {
        this.color = color;
        this.num = typeNum;
        typeNum++;
        this.definitionChanged = new Cesium.Event();
        (Cesium.Material as any)._materialCache.addMaterial(
            "PolylineTrailMaterial" + this.num,
            {
                fabric: {
                    type: 'PolylineTrailMaterial' + this.num,
                    uniforms: {
                        uTime: 0,
                        // 可外部控制颜色
                        color: this.color
                    },
                    source: `
                        czm_material czm_getMaterial(czm_materialInput materialInput)
                        {
                          // 生成默认的基础材质
                            czm_material material = czm_getDefaultMaterial(materialInput);
                            // 获取st
                            vec2 st = materialInput.st;
                            // 获取当前帧数，10秒内0-1变化
                            float time = fract(czm_frameNumber / (60.0*10.0));
                            time = time * (1.0 + 0.1);
                            // 设置平滑过渡效果
                            float alpha = smoothstep(time-0.1,time,st.s) * step(-time,-st.s);
                            // 设置光带
                            alpha += 0.1;
                            // 设置材质透明度
                            material.alpha = alpha;
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
            duration: 2,
            repeat: -1,
            yoyo: true,
        });
    }
    getType() {
        // 返回材质类型
        return "PolylineTrailMaterial" + this.num;
    }
    getValue(time: any, result: any) {
        result.uTime = this.params.uTime;
        // 返回材质值
        return result;
    }
    equals(other: { color: any; }) {
        // 判断两个材质是否相等
        return (
            other instanceof PolylineTrailMaterialProperty &&
            this.color === other.color
        );
    }
}
