import React from "react";
import {NavLink} from "react-router-dom";
import Login from './../../Auth/Login/Login';
import Register from './../../Auth/Register/Register';

export default class Header extends React.Component {
  state = {
    loginShow:false,
    registerShow:false,
    loggedIn:false,
    name:'',
    token:'',
    email:''
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
  }
  componentDidMount(){
    var loggedIn = window.localStorage.getItem("loggedIn");
    var name = window.localStorage.getItem("name");
    var email = window.localStorage.getItem("email");
    var token = window.localStorage.getItem("token");
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
                <img src="images/logo.svg" width="220px"/>
              </a>
              
              <div className="navbar-nav pull-right">
                  <ul className="navbar-nav ml-auto main-nav" id="">
                    <li><NavLink to="/"><i className="fas fa-home"></i></NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/how-to-by-pixels">How to Buy Pixels</NavLink></li>
                    <li><NavLink to="prizes">Prizes</NavLink></li>
                    <li><NavLink to="contact">Contact</NavLink></li>
                    {this.state.loggedIn ? 
                      <li><a href="#" onClick={() => this.logoutHandler()}>{this.state.name} (Logout)</a></li>
                    :
                      <li><a href="#" onClick={() => this.loginClickHandler()}>Login/Registration</a></li>
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
            <Register show={this.state.registerShow} loginHandler = {this.loginHandler} closeHandler = {() => this.registerCloseHandler()} loginClickHandler={() => this.loginClickHandler()}/>
            :
            null
          }
          </React.Fragment>
    )
  }
}