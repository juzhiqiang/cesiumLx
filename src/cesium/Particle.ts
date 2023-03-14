// 雷达材质
import * as Cesium from 'cesium'

export class Particle {
    boxEntity: any;
    constructor(viewer: Cesium.Viewer) {
        this.boxEntity = viewer.entities.add({
            name: "box",
            position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 250),
            box: {
                dimensions: new Cesium.Cartesian3(100.0, 100.0, 500),
                material: Cesium.Color.RED.withAlpha(0)
            }
        })
        viewer.clock.shouldAnimate = true;

        var particleSystem = new Cesium.ParticleSystem({
            show: true,
            // 粒子纹理
            image: "./texture/smoke.png",
            // 粒子图像大小
            imageSize: new Cesium.Cartesian2(20, 20),
            //   设置开始的颜色
            startColor: Cesium.Color.fromRandom(),
            //   设置结束的颜色
            endColor: Cesium.Color.WHITE.withAlpha(0),
            //   开始的时候粒子的大小
            startScale: 0.1,
            //   结束的时候粒子的大小
            endScale: 4.0,
            //   固定速度，米/秒
            // speed: 5.0,
            // 随机速度
            minimumSpeed: 1.0,
            maximumSpeed: 8.0,
            //   设置发射器
            // emitter: new Cesium.CircleEmitter(100),
            emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(100, 100, 500)),
            // 发射率，设置每秒产生粒子数量
            emissionRate: 30,
            //  粒子的生命周期，秒
            lifetime: 5.0,
            //   设置粒子发射的位置
            modelMatrix: this.boxEntity.computeModelMatrix(
                viewer.clock.currentTime,
                new Cesium.Matrix4()
            ),
        });
        viewer.scene.primitives.add(particleSystem);
    }


}