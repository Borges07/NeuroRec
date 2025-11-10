import { Outlet } from "react-router-dom";
import { SiteHeader } from "../SiteHeader/SiteHeader.jsx";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className={styles.wrapper}>
      <SiteHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
