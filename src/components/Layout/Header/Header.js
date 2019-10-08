import React from "react";
import {NavLink} from "react-router-dom";
import Login from './../../Auth/Login/Login';
import Register from './../../Auth/Register/Register';

export default class Header extends React.Component {
  state = {
    loginShow:false,
    registerShow:false
  }
  loginClickHandler(){
    this.setState({
      loginShow:true,
      registerShow:false
    })
  }
  closeHandler(){
    this.setState({
      loginShow:false
    })
  }
  registerOpenHandler(){
    this.setState({
      registerShow:true,
      loginShow:false
    })
  }
  registerCloseHandler(){
    this.setState({
      registerShow:false
    })
  }
  render() {
    console.log(this.props.location)
    return (
      <React.Fragment>

      
      <header>
          <nav className="navbar info-color">
              <a className="navbar-brand" href="#">
                <img src="images/logo.svg" width="220px"/>
              </a>
              
              <div className="navbar-nav pull-right">
                  <div className="pull-right" style={{margin:"5px 10px"}}>
                    <span style={{color:"#fff"}}>10,00,000 Pixels - 1₹ Per Pixel - The World's Best Photographers/Images</span>  
                    <img src="images/payment-icons.png" width="150" style={{margin:"0 5px"}}/><img src="images/social-icon.png" width="100"/></div>
                <div className="clearfix"></div>
                  <ul className="navbar-nav ml-auto main-nav" id="">
                    <li><NavLink to="/"><i className="fas fa-home"></i></NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/how-to-by-pixels">How to Buy Pixels</NavLink></li>
                    <li><NavLink to="prizes">Prizes</NavLink></li>
                    <li><NavLink to="contact">Contact</NavLink></li>
                    <li><a href="#" onClick={() => this.loginClickHandler()}>Login/Registration</a></li>
                  </ul>
              </div>
                
              
            </nav>
          </header>
          {this.state.loginShow ?
            <Login show={this.state.loginShow} closeHandler = {() => this.closeHandler()} registerOpenHandler = {() => this.registerOpenHandler()} />
            :
            null
          }
          {this.state.registerShow ? 
            <Register show={this.state.registerShow} closeHandler = {() => this.registerCloseHandler()} loginClickHandler={() => this.loginClickHandler()}/>
            :
            null
          }
          </React.Fragment>
    )
  }
}