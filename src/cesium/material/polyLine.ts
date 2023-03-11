import * as Cesium from "cesium";
import gsap from "gsap";
let typeNum = 0;
export default class PolylineTrailMaterialProperty {
    definitionChanged: any;
    params: { uTime: number; };
    name: any;
    constructor(name) {
        this.name = name;
        this.definitionChanged = new Cesium.Event();
        (Cesium.Material as any)._materialCache.addMaterial(
            "PolylineTrailMaterial",
            {
                fabric: {
                    type: 'PolylineTrailMaterial',
                    uniforms: {
                        uTime: 0
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
                            material.diffuse = vec3(0.7,0.6,1.0);
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
        return "PolylineTrailMaterial";
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
            this.name === other.name
        );
    }
}
