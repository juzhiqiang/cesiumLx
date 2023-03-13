// 雷达材质
import * as Cesium from 'cesium'
import RadarMaterialProperty from './material/RadarMaterialProperty'

export class RadarLight {
    entity: Cesium.Entity
    constructor(viewer: Cesium.Viewer) {
        this.entity = viewer.entities.add({
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(113.3291, 23.099, 113.3391, 23.109),
                material: new RadarMaterialProperty('')
            }
        })
    }
}