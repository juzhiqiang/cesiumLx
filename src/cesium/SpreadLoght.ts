// 雷达材质
import * as Cesium from 'cesium'
import LightSpreadMaterialProperty from './material/LightSpreadMaterialProperty'
import gsap from 'gsap'

export class SpreadLight {
    entity: Cesium.Entity
    params: { minLat: number; minLon: number; maxLat: number; maxLon: number }
    constructor(viewer: Cesium.Viewer) {
        this.params = {
            minLat: 113.3091,
            minLon: 23.119,
            maxLat: 113.3141,
            maxLon: 23.124,
        }
        this.entity = viewer.entities.add({
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(113.3191, 23.099, 113.3391, 23.124),
                material: new LightSpreadMaterialProperty('')
            }
        })
        gsap.to(this.params, {
            minLat: 113.2991,
            minLon: 23.109,
            maxLat: 113.3241,
            maxLon: 23.134,
            duration: 5,
            repeat: -1,
            ease: 'linear',
            onUpdate: () => {
                this.entity.rectangle.coordinates = Cesium.Rectangle.fromDegrees(this.params.minLat, this.params.minLon, this.params.maxLat, this.params.maxLon);

            }
        })
    }


}