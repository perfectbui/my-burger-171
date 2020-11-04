import React from 'react' 
import {NavLink} from 'react-router-dom'

import './NavigationItem.css'

const navigationItem = (props) => {
    return  <NavLink activeClassName="my-class" exact className="navigation-item" to={props.link}>{props.children}</NavLink>
}

export default navigationItem;