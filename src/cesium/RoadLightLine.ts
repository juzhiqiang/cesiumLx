import * as Cesium from 'cesium';
import PolylineTrailMaterialProperty from './material/polyLine';
import SpritelineTrailMaterialProperty from './material/polyLineImg';
export class RoadLightLine {
    constructor(viewer: Cesium.Viewer) {
        let geoJsonPromise = Cesium.GeoJsonDataSource.load('./geojson/roadline.geojson')
        geoJsonPromise.then(dataSource => {
            viewer.dataSources.add(dataSource);
            let entities = dataSource.entities.values;
            entities.forEach((item) => {
                let polyline = item.polyline;
                // polyline.material = new PolylineTrailMaterialProperty(new Cesium.Color(1.0, 0.0, 0.0, 1.0));
                polyline.material = new SpritelineTrailMaterialProperty(new Cesium.Color(1.0, 0.0, 0.0, 1.0));

            })
        })
    }
}