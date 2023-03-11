import * as Cesium from 'cesium'
import gsap from 'gsap'
export class LightCone {
    model: any
    modelMatrix: any
    params: any
    constructor(viewer: Cesium.Viewer, position: Cesium.Cartesian3) {
        this.params = {
            height: 700,
            degrees: 0,
            position: position
        }
        this.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            position,
            new Cesium.HeadingPitchRoll(this.params.degrees, 0, 0)
        );

        // 添加光锥模型
        this.model = viewer.scene.primitives.add(
            Cesium.Model.fromGltf({
                url: './model/pyramid.glb',
                show: true,
                scale: 200,
                minimumPixelSize: 12,
                maximumScale: 20000,
                allowPicking: false,
                debugShowBoundingVolume: false,
                debugWireframe: false,
                color: Cesium.Color.YELLOW.withAlpha(.8),
                // 设置颜色混合模式
                colorBlendMode: Cesium.ColorBlendMode.MIX,
                // 设置模型位置矩阵
                modelMatrix: this.modelMatrix
            }))
        this.animata()
    }

    public animata() {
        gsap.to(this.params, {
            height: 800,
            degrees: Math.PI,
            yoyo: true,
            repeat: -1,
            duration: 1,
            ease: 'power1.inOut',
            // 数值发生更新时候
            onUpdate: () => {
                this.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
                    this.params.position,
                    new Cesium.HeadingPitchRoll(this.params.degrees, 0, 0)
                )
            }
        })
    }
}