import { Link, Outlet } from 'umi';
import styles from './index.less';
(window as any).CESIUM_BASE_URL = "/Cesium";
import "../public/Cesium/Widgets/widgets.css";

export default function Layout() {
  return (
    <div className={styles.navs}>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>
       */}
       <Outlet />
    </div>
  );
}
