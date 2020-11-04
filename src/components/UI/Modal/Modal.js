import React,{Component} from "react";

import "./Modal.css";
import BackDrop from '../Backdrop/Backdrop'

class modal extends Component {
  shouldComponentUpdate=(nextProps,nextStates)=>{
      return nextProps.show!==this.props.show || nextProps.children!==this.props.children;
  }
  render() {
    return (
      <div>
      <BackDrop show={this.props.show} clicked={this.props.closedModal}/>
      <div
        className="modal"
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0",
        }}
      >
        {this.props.children}
      </div>
      </div>
    );
  }
};

export default modal;
