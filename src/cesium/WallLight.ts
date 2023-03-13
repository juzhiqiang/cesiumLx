// 雷达材质
import * as Cesium from 'cesium'
import WallLightMaterialProperty from './material/WallLightMaterialProperty'

export class WallLight {
    entitly: Cesium.Entity
    constructor(viewer: Cesium.Viewer) {
        this.entitly = viewer.entities.add({
            name: '光墙',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                    113.3051, 23.099, 200.0, 113.3101, 23.099, 200.0, 113.3101, 23.104,
                    200.0, 113.3051, 23.104, 200.0, 113.3051, 23.099, 200.0,]),
                material: new WallLightMaterialProperty(''),
            }
        })
    }


}