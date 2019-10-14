import React from "react";
import {NavLink} from "react-router-dom";
import Login from './../../Auth/Login/Login';
import Register from './../../Auth/Register/Register';
import RegisterConfirm from './../../Auth/Register/RegisterConfirm';

export default class Header extends React.Component {
  state = {
    loginShow:false,
    registerShow:false,
    loggedIn:false,
    name:'',
    token:'',
    email:'',
    RegisterConfirmShow:false,
    showMobileMenu: true,
    showMobileMenuButton:false
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

  registerConfirmShowHandler(){
    console.log("open")
    this.setState({
      RegisterConfirmShow:true
    })
  }

 

  registerConfirmCloseHandler(){
    console.log("closed")
    this.setState({
      RegisterConfirmShow:false
    })
  }

  loginHandler = (token, name, email) => {
    console.log(token, name, email)
    this.setState({
      loggedIn:true,
      name:name,
      email:email,
      token:token
    })
  }



  logoutHandler = () => {
    window.localStorage.setItem('loggedIn',false);
    window.localStorage.setItem("name",'');
    window.localStorage.setItem("email",'');
    window.localStorage.setItem("token",'');
    this.setState({
      loggedIn:false,
      name:'',
      email:'',
      token:''
    })
    window.localStorage.setItem("totalImages",0);
    window.location.reload();
  }

  showMobileMenuHandler(){
    this.setState({
      showMobileMenu:true
    })
  }
  HideMobileMenuHandler(){
    this.setState({
      showMobileMenu:false
    })
  }
  componentDidMount(){
    var loggedIn = window.localStorage.getItem("loggedIn");
    var name = window.localStorage.getItem("name");
    var email = window.localStorage.getItem("email");
    var token = window.localStorage.getItem("token");
    if(window.innerWidth <= 1024){
      this.setState({
        showMobileMenu:false,
        showMobileMenuButton: true
      })
    }
    if(loggedIn && loggedIn === 'true'){
      this.setState({
        loggedIn:true,
        name:name,
        email:email,
        token:token
      })
    }
  }
  render() {
    return (
      <React.Fragment>

      
      <header>
          <nav className="navbar info-color">
              <a className="navbar-brand" href="#">
                <img src={"/images/logo.svg"} width="220px"/>
              </a>


              {this.state.showMobileMenuButton ? 
                <div className="mob-btn" onClick={() => this.showMobileMenuHandler()}><i className="fas fa-bars"></i></div>
              :
                null
              }
              
              
              <div className="mob-menu pull-right" style={{display: this.state.showMobileMenu ?  'block' : 'none' }}>
              <div className="close-ico" onClick={() => this.HideMobileMenuHandler()}></div>
                  <ul className="navbar-nav ml-auto main-nav" id="">
                    <li><NavLink to="/"><i className="fas fa-home"></i></NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/how-to-by-pixels">How to Buy Pixels</NavLink></li>
                    <li><NavLink to="prizes">Prizes</NavLink></li>
                    <li><NavLink to="contact">Contact</NavLink></li>
                    {this.state.loggedIn ? 
                      <li><a onClick={() => this.logoutHandler()}>{this.state.name} (Logout)</a></li>
                    :
                      <li><a onClick={() => this.loginClickHandler()}>Login/Registration</a></li>
                    }
                    
                  </ul>
              </div>
                
              
            </nav>
          </header>
          {this.state.loginShow ?
            <Login show={this.state.loginShow} loginHandler = {this.loginHandler} closeHandler = {() => this.closeHandler()} registerOpenHandler = {() => this.registerOpenHandler()} />
            :
            null
          }
          {this.state.registerShow ? 
            <Register show={this.state.registerShow} registerConfirmShowHandler = {() => this.registerConfirmShowHandler()}  loginHandler = {this.loginHandler} closeHandler = {() => this.registerCloseHandler()} loginClickHandler={() => this.loginClickHandler()}/>
            :
            null
          }

          {this.state.RegisterConfirmShow ? 
            <RegisterConfirm registerConfirmCloseHandler = {() => this.registerConfirmCloseHandler()} show={this.state.RegisterConfirmShow} />
            :
            null
          }

          </React.Fragment>
    )
  }
}