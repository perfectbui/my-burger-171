import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let styles={};
  if (props.show) {
    styles = {transform: "translateX(0)" };
  } else {
    styles = {transform: "translateX(-102%)" };
  }
  return(
    <div>
      <Backdrop show={props.show} clicked={props.closedSideDrawer} />
      <div className="side-drawer" style={styles}>
        <Logo />
        <NavigationItems />
      </div>
    </div>
  );
};

export default sideDrawer;
