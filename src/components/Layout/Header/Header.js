import React from "react";
import {Link, NavLink} from "react-router-dom";
import Login from './../../Auth/Login/Login'

export default class Header extends React.Component {
  render() {
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
                    <li><NavLink to="/login">Login/Registration</NavLink></li>
                  </ul>
              </div>
                
              
            </nav>
          </header>
          <Login/>
          </React.Fragment>
    )
  }
}