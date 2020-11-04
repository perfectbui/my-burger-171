import React from 'react'

import './Backdrop.css'

const backDrop = (props) => {
    return props.show ? <div className="back-drop" onClick={props.clicked}></div> : "";
}

export default backDrop;