// 使用图片当材质
import * as Cesium from "cesium";
import gsap from "gsap";
// 设置静态值，多次使用防止修改到之前的颜色
export default class RadarMaterialProperty {
    definitionChanged: any;
    params: { uTime: number; };
    name: any;
    color: any;
    constructor(name: any) {
        this.name = name;
        this.definitionChanged = new Cesium.Event();
        (Cesium.Material as any)._materialCache.addMaterial(
            "RadarMaterial",
            {
                fabric: {
                    type: 'RadarMaterial',
                    uniforms: {
                        uTime: 0,
                    },
                    source: `
                        czm_material czm_getMaterial(czm_materialInput materialInput)
                        {
                          // 生成默认的基础材质
                            czm_material material = czm_getDefaultMaterial(materialInput);
                            // 旋转uv
                           
                            vec2 newSt = mat2(
                                cos(uTime),-sin(uTime),
                                sin(uTime),cos(uTime)
                                )*(materialInput.st-0.5);
                            newSt = newSt+0.5;  
                            // 获取st
                            vec2 st = newSt;
                            // 设置圆外部透明内部不透明
                            float alpha = 1.0 - step(0.5,distance(st,vec2(0.5)));
                            // 按照角度设置强弱
                            float angle = atan(st.x - 0.5,st.y-0.5);
                            // ANGLE是走-pI到PI，所以要设置0-1转变，需要加上PI
                            float strength = (angle+3.1416)/6.2832;
                            alpha = alpha*strength;
                            material.alpha = alpha;

                            material.diffuse = vec3(st.x,st.y,1.0);


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
            uTime: 6.28,
            duration: 1,
            repeat: -1,
            ease: 'linear'
        });
    }
    getType() {
        // 返回材质类型
        return "RadarMaterial";
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
