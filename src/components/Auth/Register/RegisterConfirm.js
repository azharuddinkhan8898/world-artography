import React from 'react';
import {Modal} from 'react-bootstrap'

export default class RegisterConfirm extends React.Component {
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
      this.props.registerConfirmCloseHandler()
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
                  <i className="fas fa-paper-plane"></i>
                </div>
                <h4 className="modal-title">Mail Sent!</h4>
              </div>
              <div className="modal-body">
                <p className="text-center">
                  Please check your mailbox to complete your Registration process.
                </p>
                <br/>
                <button className="btn btn-success btn-block"  onClick={() => this.handleClose()} data-dismiss="modal">
                  Ok
                </button>
            </div>
          </Modal>
        </div>
      );
    }
  }