import { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import styles from "./index.less";

import yayJpg from "../assets/yay.jpg";
export default function HomePage() {
  const cesiumContainer = useRef<any>();
  const viewerRef = useRef<any>();
  useEffect(() => {
    viewerRef.current = new Cesium.Viewer("cesiumContainer");
  }, []);
  return (
    <div
      className={styles.cesiumContainer}
      id="cesiumContainer"
      ref={cesiumContainer}
    ></div>
  );
}
