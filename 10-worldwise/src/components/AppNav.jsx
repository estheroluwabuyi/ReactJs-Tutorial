import styles from "./AppNav.module.css";
// import { nav } from "./AppNav.module.css";
// Destructure styles

function AppNav() {
  //   return <nav className={nav}>App navigation</nav>;
  return <nav className={styles.nav}>App navigation</nav>;
}

export default AppNav;
