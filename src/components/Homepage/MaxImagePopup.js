import React from 'react';
import {Modal} from 'react-bootstrap'

export default class MaxImagePopup extends React.Component {
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
      this.props.MaxImagePopupHideHandler()
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
                  <i className="fas fa-images"></i>
                </div>
                <h4 className="modal-title">Max Images Uploaded!</h4>
              </div>
              <div className="modal-body">
                {/* <p className="text-center">
                  Maximum Images are uploaded. Please check once & proceed for payment.
                </p> */}
                <br/>
                <button className="btn btn-success btn-block" data-dismiss="modal" onClick={this.handleClose}>
                  Ok
                </button>
              </div>
          </Modal>


        </div>
      );
    }
  }