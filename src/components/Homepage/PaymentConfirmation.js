import React from 'react';
import {Modal} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class PaymentConfirmation extends React.Component {
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
      this.props.PaymentCalculationClickHandlerClose()
    }
  
    handleShow() {
      this.setState({ show: true });
      
    }


  
    render() {
    var numOfImages = this.props.noOfImages;
    var pricePerImage = 6700;
        
      return (
        <div>
          
  
          <Modal show={this.state.show} onHide={this.handleClose} className="payment-screen modal-confirm">
          <div className="modal-header">
                <div className="icon-box" style={{background: "#f4d90f"}}>
                  <i className="fas fa-exclamation"></i>
                </div>
                <h4 className="modal-title">Are you sure</h4>
              </div>
              <div className="modal-body">
                <p className="text-center">
                  You can't do any changes after proceeding
                </p>
                <br/>
                <div>
                  <Link to={{pathname:"/payment", state:{noOfImages:numOfImages, priceImage: pricePerImage}}} className="btn btn-success col-sm-6" data-dismiss="modal">
                    Yes
                  </Link>
                  <button className="btn btn-danger col-sm-6" data-dismiss="modal" onClick={this.handleClose}>
                    No
                  </button>
                </div>
                <br/>
              </div>
          </Modal>





        </div>
      );
    }
  }