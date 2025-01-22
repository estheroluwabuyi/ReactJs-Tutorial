import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
// import Homepage from "../pages/HomePage";
// import City from "./City";
// import { nav } from "./AppNav.module.css";
// Destructure styles

function AppNav() {
  //   return <nav className={nav}>App navigation</nav>;
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">{/* <City /> */} Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
