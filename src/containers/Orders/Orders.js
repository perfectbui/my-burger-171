import React,{Component} from 'react'
import {connect} from 'react-redux'

import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'
import * as actions from '../../store/action/index'

class Orders extends Component {

    componentDidMount() {
       this.props.fetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let order=<Spinner/>
        if(!this.props.loading&&!this.props.error){
            order=this.props.orders.map(order=>
                <Order ingredients={order.ingredients} price={order.price}/>
            )
        }
        return(
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        error:state.order.error,
        token: state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);