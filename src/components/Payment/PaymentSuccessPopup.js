import React from 'react';
import {Modal} from 'react-bootstrap'

export default class PaymentSuccessPopup extends React.Component {
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
          
  
          <Modal show={this.state.show} onHide={this.handleClose} className="payment-screen modal-success">
          <div className="modal-header">
                    <div className="icon-box">
                    <i className="fas fa-check"></i>
                    </div>
                    <h4 className="modal-title">Awesome!</h4>
                </div>
                <div className="modal-body">
                    <p className="text-center">
                    Your transaction is completed successfully.
                    </p>
                    <br/>
                    <a className="btn btn-success btn-block" href="/" data-dismiss="modal">
                        Back to home
                        </a>
                </div>
          </Modal>


        </div>
      );
    }
  }