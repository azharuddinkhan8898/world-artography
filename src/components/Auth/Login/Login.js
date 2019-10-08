import React from 'react';
import {Modal, Popover, Tooltip, Button, OverlayTrigger } from 'react-bootstrap'


export default class Login extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
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
      this.props.closeHandler();
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      const popover = (
        <Popover id="modal-popover" title="popover">
          very popover. such engagement
        </Popover>
      );
      const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
  
      return (
        <div>
          
  
          <Modal show={this.state.show} onHide={this.handleClose}>
          
          <div className="close-modal" data-dismiss="modal" onClick={() => this.handleClose()}></div>
          <div className="col-md-6 col register-text">
            <div className="cont text-center">
              <h3>World Artography<br/>
                Photography Contest</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              <a href="#" className="btn btn-default" onClick={() => this.props.registerOpenHandler()} data-dismiss="modal" data-toggle="modal" data-target="#register">Register Now</a>
            </div>
          </div>
          <div className="col-md-6 col login-form">
              <div className="cont">
              <h3>Login</h3>
              <form autoComplete="off">
                  <div className="form-group">
                      <input type="text" id="email" className="form-control" required/>
                      <label className="form-control-placeholder" htmlFor="email">Email</label>
                  </div>
                  <div className="form-group">
                      <input type="password" id="password" className="form-control" required/>
                      <label className="form-control-placeholder" htmlFor="password">Password</label>
                  </div>
                  <div className="form-group">
                      <a href="#" className="btn btn-primary btn-block">Login</a>
                  </div>
                  <div className="form-group text-center">

                      <a href="#" className="ForgetPwd" value="Login">Forget Password?</a>
                  </div>
              </form>
              </div>
          </div>
          </Modal>
        </div>
      );
    }
  }