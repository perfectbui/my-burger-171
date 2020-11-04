import React from "react";

import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import './Toolbar.css'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return <header className="toolbar">
        <DrawerToggle clicked={props.toggledSideDrawer}/>
        <Logo/>
        <div className="nav-items"><NavigationItems/></div>
    </header>
}

export default toolbar;
