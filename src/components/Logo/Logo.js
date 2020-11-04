import React from 'react'

import LogoImage from '../../assets/images/burger.jpg'
import './Logo.css'

const logo = (props) => {
    return <div>
        <img src={LogoImage} alt="hamburger"/>
    </div>
}

export default logo;