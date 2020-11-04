import React,{Component} from 'react'

import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer:false
    }

    closedSideDrawer = () => {
        this.setState({showSideDrawer:false});
    }

    toggledSideDrawer = () => {
        this.setState((prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }

    render () {
        return (
            <Aux>
               <Toolbar toggledSideDrawer={this.toggledSideDrawer}/>
               <SideDrawer show={this.state.showSideDrawer} closedSideDrawer={this.closedSideDrawer}/>
                <main className="mt-16">
                {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;