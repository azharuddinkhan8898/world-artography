import React from 'react';
import {Modal} from 'react-bootstrap'

export default class PaymentFailedPopup extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
      };
    }

    componentDidMount(){
      console.log(this.props.show)
      this.setState({
        show:this.props.show
      })
    }
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }


  
    render() {
        
      return (
        <div>
          
  
          <Modal show={this.state.show} onHide={this.handleClose} className="payment-screen modal-failed">
          <div className="modal-header">
            <div className="icon-box">
              <i className="fas fa-times"></i>
            </div>
            <h4 className="modal-title">Oops...</h4>
          </div>
          <div className="modal-body">
            <p className="text-center">
              Your transaction is failed, Please try again.
            </p>
            <br />
            <button className="btn btn-danger btn-block" data-dismiss="modal" onClick={this.handleClose}>
              Try Again
            </button>
          </div>
          </Modal>


        </div>
    
      );
    }
  }