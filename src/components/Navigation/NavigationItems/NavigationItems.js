import React from 'react' 
import {connect} from 'react-redux'

import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const navigationItems = (props) => {
    return <div className="navigation-items">
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Order</NavigationItem> : null }
        {props.isAuthenticated ?   <NavigationItem link="/logout">Log Out</NavigationItem> :  <NavigationItem link="/auth">Sign In</NavigationItem>}
    </div>
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(navigationItems);