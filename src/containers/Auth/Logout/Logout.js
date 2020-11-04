import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actions from '../../../store/action/index'

class LogOut extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogOut())
    }
}

export default connect(null,mapDispatchToProps)(LogOut);